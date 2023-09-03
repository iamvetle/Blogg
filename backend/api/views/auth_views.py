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

class LoginView(APIView): # Login to account
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        
        if user:
            token, _ = Token.objects.get_or_create(user=user) # Get or create a token
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

class RegisterUserView(APIView): # Register a new user 
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            data = request.data
            print("New user created:", data)
            CustomUser.objects.create_user(
                username=data["username"],              
                email=data['email'], 
                first_name=data['first_name'], 
                last_name=data['last_name'], 
                password=data['password'])
            
            return Response("User creation succeded", status=status.HTTP_201_CREATED)
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