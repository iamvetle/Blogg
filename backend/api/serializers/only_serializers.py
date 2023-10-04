from api.models import CustomUser, Post, Comment, Tag, Category, SavedPost
from django.contrib.auth import get_user_model
from rest_framework import serializers
from datetime import datetime
from time import strftime
from django.utils.safestring import mark_safe

CustomUser = get_user_model()

class UserOnlyAuthorSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = ['author']
    
    def get_author(self, obj):
        username = obj.username
        
        return username

class PostOnlyTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title']
        
