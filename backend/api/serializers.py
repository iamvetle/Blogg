from .models import CustomUser, Post, Comment
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

from rest_framework import serializers

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        
        fields = ["__all__"]
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'age', 'address', 'phone_number', 'nickname')
        extra_kwargs = {
            'password': {'write_only': True, 'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True},
            }

    def create(self, validated_data):
        password = validated_data.pop('password') # Makes sure the password is not
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user
class PostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    class Meta:        
        model = Post    
        fields = ["title", "content", "author"] 
    def get_author(self, obj):
        author = {
            "username":obj.author.username
        }
        return author

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        
        fields = ["username", "first_name", "last_name", "posts"]


