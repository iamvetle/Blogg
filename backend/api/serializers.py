from .models import CustomUser, Post, Comment, Tag, Category
from django.contrib.auth import get_user_model
from rest_framework import serializers
from datetime import datetime
from time import strftime

CustomUser = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    num_of_followers = serializers.SerializerMethodField()

    def get_num_of_followers(self, obj):
        num_of_followers = 0
        print(obj)

        try:
            followers = list(obj.followers.all())

            num_of_followers = len(followers)
            return num_of_followers

        except:
            return num_of_followers

    class Meta:
        model = CustomUser

        fields = (
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "age",
            "address",
            "phone_number",
            "nickname",
            "last_online",
            "num_of_followers",
        )
        extra_kwargs = {
            "first_name": {"required": True},
            "last_name": {"required": True},
            "email": {"required": True},
            "username": {"required": True},
        }


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id','name']
        
class CategorySerializer(serializers.ModelSerializer):    
    class Meta:
        model = Category
        fields = ['id', 'name']

class PostSerializer(serializers.ModelSerializer):
    author = (
        serializers.SerializerMethodField()
        )  
    ''' Makes sure that not everything in the 'author' object gets returned '''

    date_published = serializers.SerializerMethodField()

    class Meta:
        model = Post

        fields = ["id", "title", "content", "author", "last_modified", "date_published"]
        extra_kwargs = {
            "date_published": {"read_only": True},
        }

    def get_author(self, obj):
        """ Ensures that not all of the fields from "author" is included, but only 'username', 'first_name and 'last_name """
        author = {
            "username": obj.author.username,
            "first_name": obj.author.first_name,
            "last_name": obj.author.last_name,
        }
        return author

    def get_date_published(self, obj):
        """ Makes the value of the "date" string more readable """
        if obj.date_published is not None:
            return obj.date_published.strftime("%d-%m-%Y")


class PostSnippetSerializer(serializers.ModelSerializer):  # Bare en liten del av posts
    content_snippet = serializers.SerializerMethodField()  # Limited to 225 char
    author = serializers.SerializerMethodField()
    date_published = serializers.SerializerMethodField()
    
    tags = TagSerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Post

        fields = ["id", "title", "author", "content_snippet", "date_published", "tags", "categories"]
        extra_kwargs = {
            "id": {"read_only": True},
            "date_published": {"read_only": True},
            "title": {"read_only": True},
            "content_snippet": {"read_only": True},
            "author": {"read_only": True},
            "tags": {"read_only": True},
            "categories": {"read_only": True}
        }

    def get_content_snippet(self, obj):
        content_snippet = obj.content[:225]
        if len(content_snippet) >= 100:
            content_snippet = content_snippet + " ..."

        return content_snippet

    def get_author(self, obj):
        author = {
            "username": obj.author.username,
            "first_name": obj.author.first_name,
            "last_name": obj.author.last_name,
        }
        return author

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
        return obj.date_published.strftime("%d-%m-%Y")


class UserProfileSerializer(serializers.ModelSerializer):
    posts = serializers.SerializerMethodField()

    num_of_followers = serializers.SerializerMethodField()

    def get_posts(self, obj):
        posts = Post.objects.filter(author__username=obj.username)
        return PostSnippetSerializer(posts, many=True).data

    def get_num_of_followers(self, obj):
        num_of_followers = 0
        print(obj)

        try:
            followers = list(obj.followers.all())

            num_of_followers = len(followers)
            return num_of_followers

        except:
            return num_of_followers

    class Meta:
        model = CustomUser

        fields = ["num_of_followers", "username", "first_name", "last_name", "posts"]


class FollowersSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser

        fields = ["username"]


class JustLoggedInSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser

        fields = ["username, first_name, last_name"]

        extra_kwargs = {
            "username": {"read_only": True},
            "first_name": {"read_only": True},
            "last_name": {"read_only": True},
        }

