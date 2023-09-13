from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import UserSerializer, PostSerializer, UserProfileSerializer, FollowersSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from ..models import Post, Comment
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from api.services.user_services import UserProfileService, MyProfileService
from django.core.serializers import serialize


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
            return Response(status=status.HTTP_404_NOT_FOUND) 

class FollowUserView(APIView): # Currently workign with this

    permission_classes = [IsAuthenticated]

    def get(self, request, username):

        response = UserProfileService.follow_user(request, username)
        if response["status"] != False :
            print(f"{response['current_user']} started following {response['user_to_follow']}") # print to self
            return Response(f"{response['current_user']} started following {response['user_to_follow']}", status=status.HTTP_200_OK) # print to client console
        else:
            print(f"{response['current_user']} did NOT start following {response['user_to_follow']}") # print to self
            return Response(f"{response['current_user']} did NOT start following {response['user_to_follow']}", status=status.HTTP_400_BAD_REQUEST) # print to self

class UnfollowUserView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, username):
        
        response = UserProfileService.unfollow_user(request, username)
        
        if response != None:
            print(f"Successfully unfollwed {response['user_to_unfollow']}")
            return Response(f"Successfully unfollwed {response['user_to_unfollow']}", status=status.HTTP_200_OK)

        else:
            print("Failed to unfollow")
            return Response("Failed to unfollow", status=status.HTTP_400_BAD_REQUEST)

class CurrentFollowersView(APIView):
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        
        followers = MyProfileService.get_all_followers(request)
        print(followers.data)
        
        if followers.data != None:            
            print("List of users that are follwing", followers.data)
            return Response(followers.data, status=status.HTTP_200_OK)
        else:
            print("You have no followers lol (or there is an error)", followers.errors)
            return Response("You have no followers lol (or there is an error)", status=status.HTTP_204_NO_CONTENT)

