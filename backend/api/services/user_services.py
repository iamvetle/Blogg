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
    
    @staticmethod
    def follow_user(request, username): # bruker ikke
        user_to_follow = CustomUser.objects.get(username=username)
        
        current_user = request.user
        
        try:
            current_user.following.add(user_to_follow)
            current_user.save()
            return {
                "status":True,
                "current_user":current_user,
                "user_to_follow":user_to_follow,
            }
        except:
            return {
                "status":False,
                "current_user":current_user,
                "user_to_follow":user_to_follow,
            }
        

class MyProfileService():
    
    @staticmethod
    def is_followed_by(request):
        current_user = request.user
                
        all_followers = current_user.followers.all()
        
        if all_followers.exists():
            serializer = FollowersSerializer(all_followers, many=True)
            
            return serializer
        else:
            return None