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

class LoginService(): # Try login logic
    
    @staticmethod
    def login_user(username, password):
        
        user = authenticate(username=username, password=password) # Tries to authenticate
            
        if user:
            token, _ = Token.objects.get_or_create(user=user) # 'Get' or 'Create' a token
            return token
        else:
            return None
        

class NewUserService(APIView): # Try to register a user logic
        
        @staticmethod
        def register_user(registration_data):

            serializer = UserSerializer(data=registration_data)
            
            
            print(registration_data)


            if serializer.is_valid():

                data = registration_data
                
                CustomUser.objects.create_user(
                    username=data["username"],              
                    email=data['email'], 
                    first_name=data['first_name'], 
                    last_name=data['last_name'], 
                    password=data['password'])
                return data
            else:
                print("Returned none?")
                return None

        
        
