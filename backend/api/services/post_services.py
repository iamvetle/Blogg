# #  service class is a Python class that contains business logic related to a particular entity or use case.

# # Application logic. Does not directly deal with HTTP requests and responses.

# from api.serializers import PostSerializer, PostSnippetSerializer

# class PostService:
#     @staticmethod
#     def create_post()
    
    
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import PostSerializer, PostSnippetSerializer
from rest_framework import status
from ..models import Post
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated

CustomUser = get_user_model()

class CreatePostService():

    @staticmethod
    def create_new_post(post_data):
        serializer = PostSerializer(data=post_data.data)
        if serializer.is_valid():
            serializer.save(author=post_data.user)
            return serializer
        else:
            return None

