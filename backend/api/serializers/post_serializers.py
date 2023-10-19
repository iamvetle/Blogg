from api.models import CustomUser, Post, Comment, Tag, Category, SavedPost
from api.serializers.only_serializers import (
    OnlyAuthorCustomUserSerializer,
    OnlyTitlePostSerializer,
)
from django.contrib.auth import get_user_model
from rest_framework import serializers
from time import strftime
from django.utils.safestring import mark_safe

CustomUser = get_user_model()

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["name"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name"]

class PostSerializer(serializers.ModelSerializer):
    """Serializes the input. Can be used on both single and multiple post objects"""

    author = OnlyAuthorCustomUserSerializer(read_only=True)
    # Makes sure that not everything in the 'author' object gets returned

    date_published = serializers.SerializerMethodField()

    class Meta:
        model = Post

        content = serializers.SerializerMethodField()

        fields = ["id", "title", "content", "author", "date_published"]
        extra_kwargs = {
            "date_published": {"read_only": True},
        }

    def get_content(self, obj):
        content = obj.content
        content = mark_safe(content)

        return content

    def get_date_published(self, obj):
        if obj.date_published is not None:
            return obj.date_published.strftime("%d-%m-%Y")


class PostShortenSerializer(serializers.ModelSerializer):  # Bare en liten del av posts
    """Shortenes the content. Can be used on both multiple and single posts"""

    content_snippet = serializers.SerializerMethodField()  # Limited to 225 char
    author = OnlyAuthorCustomUserSerializer(read_only=True)
    date_published = serializers.SerializerMethodField()

    tags = TagSerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)

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
        ]
        extra_kwargs = {
            "id": {"read_only": True},
            "date_published": {"read_only": True},
            "title": {"read_only": True},
            "content_snippet": {"read_only": True},
            "author": {"read_only": True},
            "tags": {"read_only": True},
            "categories": {"read_only": True},
        }

    def get_content_snippet(self, obj):
        content_snippet = obj.content[:225]
        if len(content_snippet) >= 100:
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
    user = OnlyAuthorCustomUserSerializer()
    post = OnlyTitlePostSerializer()

    class Meta:
        model = SavedPost
        fields = ["user", "post"]
