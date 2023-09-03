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
from api.services.auth_services import LoginService, NewUserService

CustomUser = get_user_model()

### AUTHENTICATION HANDELING

class LoginView(APIView): # Login to account
    
    def post(self, request):
        
        username = request.data.get('username')
        password = request.data.get('password')
        
        token = LoginService.login_user(username, password) 
        
        if token is not None:
            print(f"Correct credentials, logged in as {username}. Token {token.key}")
            return Response({'token': token.key}, status=status.HTTP_200_OK) # Correct credentials / token
        
        else:
            print(f"Incorrect credentials ('{username}, {password}')")
            return Response("Wrong credentials ", status=status.HTTP_401_UNAUTHORIZED) # Wrong credentials       

class RegisterUserView(APIView): # Register a new user 
    
    def post(self, request):

        new_user_data = request.data

        response = NewUserService.register_user(new_user_data)

        if response is not None:    
            print(f"New user, {response['username']}, created")
            return Response(f"Sucessfuly created new user", status=status.HTTP_201_CREATED)
        else:
            return Response("User creation failed", status=status.HTTP_400_BAD_REQUEST)


def follow_user(request, username):
    user_to_follow = CustomUser.objects.get(username=username)
    
    current_user = request.user
    
    current_user.following.add(user_to_follow)
    
    current_user.save()

### Checking if server is online

class HealthCheck(APIView):

    def get(self, request):
        Response(status=status.HTTP_200_OK)