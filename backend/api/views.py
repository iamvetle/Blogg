from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework import status

class MyAccountView(APIView):
    
    def get(self, request):
        
        if request.user.authenticated:
            serializer = UserSerializer(request.user)
            return Response(serializer.data, status=status.HTTP_200_OK) # AUTHORIZED - OK
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED) # NOT AUTHORIZED - NOT OK
        
        
    # if is authentication
    
    # def get userinformation
    
    # def get another user

class MyUserView(APIView):
    
class AllPosts(APIView):
    # if is authenticated
    
    # def get - retrieves all posts ? - cant get all posts

class NewPost(APIView):
    # if is authenticated
    
    # def post - new post
    
    
class SeePost(APIView):
    # if is authenticated
    
    # see a specific post information
    
class CustomUser(APIView)

    different user information


