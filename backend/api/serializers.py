from .models import CustomUser, Post

from rest_framework import serializers

class PostSerializer(serializers.ModelSerializer):
    
    class meta:
        model = Post
        
        fields = ["__all__"] 

class UserSerializer(serializers.ModelSerializer):
    class meta:
        posts = PostSerializer(many=True, read_only=True)
        
        model = CustomUser
        
        fields = ["username", "email", "first_name", "last_name" "password", "posts"]
        
class ProfileSerializer(serializers.ModelSerializer):
    class meta:
        model = CustomUser
        
        fields = ["username", "first_name", "last_name"]

