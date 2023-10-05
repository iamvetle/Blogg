from api.models import CustomUser, Post, Comment, Tag, Category, SavedPost
from django.contrib.auth import get_user_model
from rest_framework import serializers
from datetime import datetime
from time import strftime
from django.utils.safestring import mark_safe

CustomUser = get_user_model()

class UserOnlyAuthorSerializer(serializers.ModelSerializer):
    ''' If an object contains user id, the class function will return expanded 
    information on the user if a us'''    

    username = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = ['username', 'first_name', 'last_name']
    
    def get_username(self, obj):
        return obj.username
    def get_first_name(self,obj):
        return obj.first_name
    def get_last_name(self,obj):
        return obj.last_name

class PostOnlyTitleSerializer(serializers.ModelSerializer):
    ''' If the passing object contains post id, the class function will 
    return "exchange", the post title '''
    title = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ['title']
    
    def get_title(self, obj):
        return obj.title
        
        