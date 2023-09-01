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

CustomUser = get_user_model()


### USER HANDLING

class MyAccountView(APIView): # Personal account
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserProfileView(APIView): # Other user profiles

    permission_classes = [IsAuthenticated]

    def get(self, request, username):

        queryset = CustomUser.objects.filter(username=username)                
        
        if not queryset.exists():
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserProfileSerializer(queryset, many=True)

        print(serializer.data)    
        return Response(serializer.data, status=status.HTTP_200_OK)    

def follow_user(request, username):
    user_to_follow = CustomUser.objects.get(username=username)
    
    current_user = request.user
    
    current_user.following.add(user_to_follow)
    
    current_user.save()

