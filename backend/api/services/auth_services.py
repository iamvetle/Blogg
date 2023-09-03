from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import UserSerializer, PostSerializer, PostSnippetSerializer, UserProfileSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from ..models import Post, Comment
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated

class LoginService():
    
    @staticmethod
    def login_user(username, password):
        
        user = authenticate(username=username, password=password) # Tries to authenticate
            
        if user:
            token, _ = Token.objects.get_or_create(user=user) # 'Get' or 'Create' a token
            return token
        else:
            return None
        
        
