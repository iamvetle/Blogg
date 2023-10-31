from api.models import Post, Comment, Tag, Category, SavedPost, PostVideo, PostImage
from api.serializers.only_serializers import (
    OnlyAuthorCustomUserSerializer,
    OnlyTitlePostSerializer,
)
from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.utils.safestring import mark_safe
from django.utils.html import format_html

from time import strftime

CustomUser = get_user_model()


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["name"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name"]

        
class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['image']
        
class PostVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostVideo
        fields = ['video']


# Is used for create and for detail retrieve
class PostSerializer(serializers.ModelSerializer):
    """Serializes the input. Can be used on both single and multiple post objects"""

    author = OnlyAuthorCustomUserSerializer(read_only=True)
    # SerialiserMethodField is read_only by default
    date_published = serializers.SerializerMethodField(required=False) # I don't want to end up being able to update date_published    
    
    content = serializers.CharField(max_length=10000)
    tags = serializers.StringRelatedField(many=True, required=False)
    categories = serializers.StringRelatedField(many=True, required=False)
    
    images = PostImageSerializer(many=True, required=False)
    videos = PostVideoSerializer(many=True, required=False)

    class Meta:
        model = Post

        fields = ["id", "title", "content", "author", "date_published", "tags", "categories", "images", "videos"]
        read_only_fields = ["id"]
    
    def create(self, validated_data):
        validated_data['content'] = format_html(validated_data['content'])
        author = self.context['request'].user
        post = Post.objects.create(**validated_data, author=author)
        return post

    def get_content(self, obj):
        content = obj.content
        
        content = format_html(content)
        return content

    def get_date_published(self, obj):
        if obj.date_published is not None:
            return obj.date_published.strftime("%d-%m-%Y")
        
        # def create?

class PostShortenSerializer(serializers.ModelSerializer):
    """Shortenes the post. Can be used on both multiple and single posts"""

    content_snippet = serializers.SerializerMethodField(read_only=True)  # Limited to 200 char
    author = OnlyAuthorCustomUserSerializer(read_only=True)
    date_published = serializers.SerializerMethodField(read_only=True)

    tags = TagSerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    
    images = PostImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Post

        fields = [
            "id",
            "title",
            "author",
            "content_snippet",
            "date_published",
            "tags",
            "categories",
            "images",
        ]
        
        read_only_fields = ['title']

    def get_content_snippet(self, obj):
        content_snippet = obj.content[:200]
        if len(content_snippet) >= 200:
            content_snippet = content_snippet + " ..."

        return content_snippet

    def get_date_published(self, obj):
        if obj.date_published is not None:
            return obj.date_published.strftime("%d-%m-%Y")


class CommentSerializer(serializers.ModelSerializer):  # Not in use
    author = serializers.SerializerMethodField()
    post = serializers.SerializerMethodField()
    date_published = serializers.SerializerMethodField()

    class Meta:
        model = Comment

        fields = ["title", "content_snippet", "date_published"]
        extra_kwargs = {
            "author": {"read_only": True},
            "date_published": {"read_only": True},
            "post": {"read_only": True},
        }

    def get_author(self, obj):
        author = {
            "username": obj.author.username,
            "first_name": obj.author.first_name,
            "last_name": obj.author.last_name,
        }
        return author

    def get_post(self, obj):
        post = {
            "title": obj.title,
            "author_first_name": obj.author.first_name,
            "author_last_name": obj.author.last_name,
        }
        return post

    def get_date_published(self, obj):
        if obj.date_published is not None:
            return obj.date_published.strftime("%d-%m-%Y")

class PostSaveStyleSerializer(serializers.ModelSerializer):
    """Proccesses the data and returns only the post that is saved.
    so 'user' has been ommitted, since it is a referance to the
    customuser whom saved it - which is uninteresting for us."""

    post = serializers.SerializerMethodField()

    class Meta:
        model = SavedPost
        fields = ["post"]

    def get_post(self, obj):
        post = {
            "id": obj.post.id,
            "title": obj.post.title,
            "username": obj.post.author.username,
            "first_name": obj.post.author.first_name,
            "last_name": obj.post.author.last_name,
        }
        return post