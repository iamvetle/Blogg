from .models import CustomUser, Post, Comment

from rest_framework import serializers

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        
        fields = ["__all__"]
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser

        fields = ["username", "email", "first_name", "last_name", "password"]

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer()   
    class Meta:        
        model = Post
        
        fields = ["id", "title", "content", "author"]        

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        
        fields = ["username", "first_name", "last_name", "posts"]


