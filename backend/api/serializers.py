from .models import CustomUser, Post, Comment

from rest_framework import serializers

class CommentSerializer(serializers.ModelSerializer):
    class meta:
        model = Comment
        
        fields = ["__all__"]

class PostSerializer(serializers.ModelSerializer):    
    class meta:        
        model = Post
        
        fields = ["__all__"] 

class UserSerializer(serializers.ModelSerializer):
    class meta:
        model = CustomUser

        fields = ["username", "email", "first_name", "last_name" "password", "posts"]
        
class ProfileSerializer(serializers.ModelSerializer):
    class meta:
        model = CustomUser
        
        fields = ["username", "first_name", "last_name", "posts"]


