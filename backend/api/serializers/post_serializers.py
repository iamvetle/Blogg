from api.models import Post, Comment, Tag, Category, SavedPost, PostVideo, PostImage
from api.serializers.only_serializers import (
    OnlyAuthorCustomUserSerializer,
)
from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.utils.safestring import mark_safe
from django.utils.html import format_html

from time import strftime

CustomUser = get_user_model()

class CommentSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField()
    date_published = serializers.SerializerMethodField()
    
    author = serializers.StringRelatedField()
    
    class Meta:
        model = Comment
        fields = ["id", "post", "content", "author", "date_published"]
        
        read_only_fields = ["date_published"]        
        
    def get_content(self, obj):
        content = obj.content
        
        content = format_html(content)
        return content

    def get_date_published(self, obj):
        return obj.date_published.strftime("%d-%m-%Y")


class TagSerializer(serializers.ModelSerializer):
    post_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Tag
        fields = ["name", "post_count"]
        
        extra_kwargs = {
            "post_count":{"write_only":True}
        }

    def get_post_count(self, obj):
        """Returns the number of posts that have this exact tag"""
        return obj.posts.count()

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
    """Serializes the input. Is used on single post"""

    author = OnlyAuthorCustomUserSerializer(read_only=True)
    date_published = serializers.SerializerMethodField(required=False) # read only by deafault I don't want to end up being able to update date_published    
    num_of_comments = serializers.SerializerMethodField() # number
    
    content = serializers.CharField(max_length=10000)
    tags = serializers.StringRelatedField(many=True, required=False)
    categories = serializers.StringRelatedField(many=True, required=False)
    
    images = PostImageSerializer(many=True, required=False) # Cannot be updated
    videos = PostVideoSerializer(many=True, required=False) # Cannot be updated

    class Meta:
        model = Post

        fields = ["id", "title", "content", "author", "date_published", "tags", "categories", "images", "videos", "num_of_comments"]
        read_only_fields = ["id", "date_published", "author"]
    
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
        
    def get_num_of_comments(self, obj):
        length = 0
        
        all_comments = obj.comments.all()
        length = len(list(all_comments))
        
        return length
        
class PostShortenSerializer(serializers.ModelSerializer):
    """Shortenes the post. Can be used on both multiple and single posts"""

    content_snippet = serializers.SerializerMethodField(read_only=True)  # Limited to 200 char
    author = OnlyAuthorCustomUserSerializer(read_only=True)
    date_published = serializers.SerializerMethodField(read_only=True)
    
    num_of_comments = serializers.SerializerMethodField()

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
            "num_of_comments",
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

    def get_num_of_comments(self, obj):
        length = 0
        
        all_comments = obj.comments.all()
        length = len(list(all_comments))
        
        return length

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
    
    
