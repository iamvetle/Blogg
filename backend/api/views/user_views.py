# Standard libraries
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist

# Third-party libraries

## Django Rest Framework
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, ListCreateAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


# Local application imports
from django.shortcuts import get_object_or_404
from api.services.user_services import UserProfileService
from api.serializers.user_serializers import (
    LoggedInUserSerializer,
    NormalUserSerializer,
    FollowerSerializer,
)

from api.pagination import CustomLimitOffsetPagination as GenericPagination

# A view is responsible for processing incomming HTTP requests and returning HTTP responses - handle user-facing logic.

CustomUser = get_user_model()


class LoggedInUserProfileView(RetrieveAPIView):
    """Returns profile information about the LOGGED-IN user"""

    permission_classes = [IsAuthenticated]
    serializer_class = LoggedInUserSerializer

    http_method_names = ["get"]

    def get_object(self):
        # my_user = CustomUser.objects.get(username=self.request.user)
        my_user = get_object_or_404(CustomUser, username=self.request.user)
        return my_user


class NormalUserProfileView(RetrieveAPIView):
    """Returns information about a SPECIFIC user"""

    permission_classes = [IsAuthenticated]
    serializer_class = NormalUserSerializer
    queryset = CustomUser.objects.all()

    lookup_field = "username"
    http_method_names = ["get"]

class FollowUserView(RetrieveAPIView):
    """Follows specified user"""
    permission_classes = [IsAuthenticated]
    pagination_class = None
    serializer_class = FollowerSerializer
    
    queryset = CustomUser.objects.all()
    lookup_field = 'username'
    
    http_method_names = ['post']
    
    def post(self, request, *args, **kwargs):
        
        try:
            username = self.get_object()
        except ObjectDoesNotExist:
            return Response({ "message": "User doesn't exist" }, status=status.HTTP_404_NOT_FOUND)  

        if username == request.user:
            return Response({ "message": "You can't follow yourself" }, status=status.HTTP_400_BAD_REQUEST)
                
        if username in request.user.following.all():
            return Response({ "message": "You are already following this user" }, status=status.HTTP_400_BAD_REQUEST)           
        else:
            request.user.following.add(username)
            return Response({ "message": "Started following" }, status=status.HTTP_200_OK)        

class UnfollowUserView(RetrieveAPIView):
    """Unfollows specified user"""
    permission_classes = [IsAuthenticated]
    pagination_class = None
    serializer_class = FollowerSerializer
    
    queryset = CustomUser.objects.all()
    lookup_field = 'username'
    
    http_method_names = ['post']
    
    def post(self, request, *args, **kwargs):
        
        try:
            username = self.get_object()
        except ObjectDoesNotExist:
            return Response({ "message": "User doesn't exist" }, status=status.HTTP_404_NOT_FOUND)  

        if username == request.user:
            request.user.following.remove(username) # I have temporarily put this here to make users able to unfollow themselves, but not follow again
            return Response({ "message": "You can't unfollow yourself" }, status=status.HTTP_400_BAD_REQUEST)
                
        if username not in request.user.following.all():
            return Response({ "message": "You are not following this user. There is nobody to unfollow" }, status=status.HTTP_400_BAD_REQUEST)           
        else:
            request.user.following.remove(username)
            return Response({ "message": "Unfollowed user" }, status=status.HTTP_200_OK)     

class LoggedInUserAllFollowers(ListAPIView):
    """Returns a list of users following the logged-in user"""

    permission_classes = [IsAuthenticated]
    pagination_class = GenericPagination

    serializer_class = FollowerSerializer

    def get_queryset(self):
        logged_in_user = self.request.user
        followers_list = logged_in_user.followers.all()

        return followers_list


class LoggedInUserAllFollowing(ListAPIView):
    """Returns a list of users that the logged-in user is following"""

    permission_classes = [IsAuthenticated]

    serializer_class = FollowerSerializer
    pagination_class = GenericPagination

    def get_queryset(self):
        logged_in_user = self.request.user
        user_is_following = logged_in_user.following.all()

        return user_is_following
