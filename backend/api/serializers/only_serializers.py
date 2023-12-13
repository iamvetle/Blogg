from api.models import Post
from django.contrib.auth import get_user_model
from rest_framework import serializers

CustomUser = get_user_model()

class OnlyAuthorCustomUserSerializer(serializers.ModelSerializer):
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

class OnlyTitlePostSerializer(serializers.ModelSerializer):
    ''' If the passing object contains post id, the class function will 
    return "exchange", the post title (and also the post id..)'''
    title = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ['id', 'title']
    
    def get_title(self, obj):
        return obj.title
        
        
class OnlyRealDateTimeSerializer(serializers.ModelSerializer):
    ''' Takes post object and returns a more readable date_published field '''
    date_published = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ['date_published']
        
    def get_date_published(self, obj):
        return obj.date_published.strftime("%d-%m-%Y")