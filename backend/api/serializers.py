from .models import CustomUser, Post, Comment
from django.contrib.auth import get_user_model
from rest_framework import serializers


CustomUser = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser

        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'age', 'address', 'phone_number', 'nickname', 'last_online')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True},
            'username': {'required': True},
            }
    
class PostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField() # Passer på at ikke ALT av CustomUser blir sendt med

    class Meta:        
        model = Post

        fields = ["id", "title", "content", "author", "last_modified", "date_published"]
        extra_kwargs = {
            "date_published": {"read_only": True},
        } 

    def get_author(self, obj):
        author = {
            "username":obj.author.username,
            "first_name":obj.author.first_name,
            "last_name":obj.author.last_name
        }
        return author

class PostSnippetSerializer(serializers.ModelSerializer): # Bare en liten del av posts

    content_snippet = serializers.SerializerMethodField() # Limited to 100 char
    author = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        
        fields = ["id", "title", "author", "content_snippet", "date_published"]
        extra_kwargs = {
            "id": {"read_only": True},
            "date_published": {"read_only": True},
            "title": {"read_only": True},
            "content_snippet": {"read_only": True},
            "author": {"read_only": True}
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

class CommentSerializer(serializers.ModelSerializer): # Not in use
    
    author = serializers.SerializerMethodField()
    post = serializers.SerializerMethodField()

    class Meta:
        model = Comment

        fields = ["title", "content_snippet", "date_published"]
        extra_kwargs = {
            "author": {"read_only": True},
            "date_published": {"read_only": True},
            "post": {"read_only": True}
        }
        
    def get_author(self, obj):
        author = {
            "username":obj.author.username,
            "first_name":obj.author.first_name,
            "last_name":obj.author.last_name
        }
        return author

    def get_post(self, obj):
        post = {
            "title":obj.title,
            "author_first_name":obj.author.first_name,
            "author_last_name":obj.author.last_name,
        }
        return post

class UserProfileSerializer(serializers.ModelSerializer):
    posts = serializers.SerializerMethodField()

    def get_posts(self, obj):
                
        posts = Post.objects.filter(author__username=obj.username)
        return PostSnippetSerializer(posts, many=True).data

    class Meta:
        model = CustomUser

        fields = ["username", "first_name", "last_name", "posts"]