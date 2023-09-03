from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import UserSerializer, PostSerializer, UserProfileSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from ..models import Post, Comment
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated


CustomUser = get_user_model()


### USER HANDLING
    
class UserProfileService(): # Other user profiles

    @staticmethod
    def get_user_profile(username):

        queryset = CustomUser.objects.filter(username=username)                
        
        if not queryset.exists():
            return None
        else:
            serializer = UserProfileSerializer(queryset, many=True)

            return serializer.data  