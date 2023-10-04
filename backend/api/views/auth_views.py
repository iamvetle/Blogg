from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from api.serializers.user_serializers import UserSerializer
from api.serializers.post_serializers import PostSerializer, PostSnippetSerializer, UserProfileSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from ..models import Post, Comment
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from api.services.auth_services import LoginService, NewUserService

CustomUser = get_user_model()

### AUTHENTICATION HANDELING

class LoginView(APIView): # Login
    
    def post(self, request):
        
        info_for_store = LoginService.login_user(request) 
        
        if info_for_store is not None:
            print(f"Correct credentials, logged in as {info_for_store['username']}. Token {info_for_store['token']}")
            return Response(info_for_store, status=status.HTTP_200_OK) # Correct credentials / token
        
        else:
            print(f"Incorrect credentials")
            return Response("Wrong credentials ", status=status.HTTP_401_UNAUTHORIZED) # Wrong credentials       

class RegisterUserView(APIView): # Registrer
    
    def post(self, request):

        new_user_data = request.data

        response = NewUserService.register_user(new_user_data)

        if response is not None:    
            print(f"New user, {response['username']}, created")
            return Response(f"Sucessfuly created new user", status=status.HTTP_201_CREATED)
        else:
            return Response("User creation failed", status=status.HTTP_400_BAD_REQUEST)