from api.models import Post, Comment, Tag, SavedPost, PostVideo, PostImage
from api.serializers.only_serializers import (
    OnlyAuthorCustomUserSerializer,
    OnlyTitlePostSerializer,
)

from api.serializers.tag_serializers import TagSerializer

from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.utils.safestring import mark_safe
from django.utils.html import format_html

from time import strftime

CustomUser = get_user_model()
      
class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['image']
        
class PostVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostVideo
        fields = ['video']

# Is used for create and for detail retrieve
class PostSerializer(serializers.ModelSerializer):
    """Serializes the input. Is used on single post"""

    author = OnlyAuthorCustomUserSerializer(read_only=True)
    date_published = serializers.SerializerMethodField(required=False) # read only by deafault I don't want to end up being able to update date_published    
    num_of_comments = serializers.SerializerMethodField() # number
    
    content = serializers.CharField(max_length=10000) # Can maximum have post a post with 10 000 char | 80 000 on actual the backend
    tags = serializers.StringRelatedField(many=True, required=False)
    
    images = PostImageSerializer(many=True, required=False) # Cannot be updated
    videos = PostVideoSerializer(many=True, required=False) # Cannot be updated

    class Meta:
        model = Post

        fields = ["id", "title", "content", "author", "date_published", "tags", "images", "videos", "num_of_comments"]
        read_only_fields = ["id", "date_published", "author"]

    # def validate(self, attrs):
    #     attributes = super().validate(attrs)
        
    #     title = attributes["title"]
        
    #     print(title)
    #     print(len(title))
        
    #     return attributes

    # When trying to create
    def create(self, validated_data):
        validated_data['content'] = format_html(validated_data['content'])
        author = self.context['request'].user
        post = Post.objects.create(**validated_data, author=author)
        return post

    # Field
    def get_content(self, obj):
        content = obj.content
        
        content = format_html(content)
        return content

    # Field
    def get_date_published(self, obj):
        if obj.date_published is not None:
            return obj.date_published.strftime("%d-%m-%Y")
        
    # Field
    def get_num_of_comments(self, obj):
        length = 0
        
        all_comments = obj.comments.all()
        length = len(list(all_comments))
        
        return length
        
class PostShortenSerializer(serializers.ModelSerializer):
    """Shortenes the post. Can be used on both multiple and single posts"""

    content_snippet = serializers.SerializerMethodField(read_only=True)  # Limited to 200 char
    author = OnlyAuthorCustomUserSerializer(read_only=True)
    date_published = serializers.SerializerMethodField(read_only=True)
    
    num_of_comments = serializers.SerializerMethodField()

    tags = TagSerializer(many=True, read_only=True)
    
    images = PostImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Post

        fields = [
            "id",
            "title",
            "author",
            "content_snippet",
            "date_published",
            "tags",
            "images",
            "num_of_comments",
        ]
        
        read_only_fields = ['title']

    # This is only when GET is used to retrieve posts - so no posts are changed on the DATABASE
    def get_content_snippet(self, obj):
        content_snippet = obj.content[:200]
        if len(content_snippet) >= 200:
            content_snippet = content_snippet + " ..."

        return content_snippet

    def get_date_published(self, obj):
        if obj.date_published is not None:
            return obj.date_published.strftime("%d-%m-%Y")

    def get_num_of_comments(self, obj):
        length = 0
        
        all_comments = obj.comments.all()
        length = len(list(all_comments))
        
        return length

class PostSaveStyleSerializer(serializers.ModelSerializer):
    """Proccesses the data and returns only the post that is saved.
    so 'user' has been ommitted, since it is a referance to the
    customuser whom saved it - which is uninteresting for us."""

    post = serializers.SerializerMethodField()

    class Meta:
        model = SavedPost
        fields = ["post"]

    def get_post(self, obj):
        post = {
            "id": obj.post.id,
            "title": obj.post.title,
            "username": obj.post.author.username,
            "first_name": obj.post.author.first_name,
            "last_name": obj.post.author.last_name,
        }
        return post
    
    
