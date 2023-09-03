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
from api.services.user_services import UserProfileService

# A view is responsible for processing incomming HTTP requests and returning HTTP responses - handle user-facing logic. 

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

        response = UserProfileService.get_user_profile(username)

        if response is not None:
            print(f"Data from '{username}' retrieved:", response)
            return Response(response, status=status.HTTP_200_OK)    

        else:
            print(f"The user '{username}' does not exist")
            return Response(status=status.HTTP_400_BAD_REQUEST) 

def follow_user(request, username): # bruker ikke
    user_to_follow = CustomUser.objects.get(username=username)
    
    current_user = request.user
    
    current_user.following.add(user_to_follow)
    
    current_user.save()

