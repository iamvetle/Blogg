# Standard libraries 
from django.contrib.auth import get_user_model

# Third-party libraries

## Django Rest Framework
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# Local application imports
from api.models import Post, Comment
from django.shortcuts import get_object_or_404
from api.services.user_services import UserProfileService, MyProfileService
from api.serializers.user_serializers import LoggedInUserSerializer, NormalUserSerializer

# A view is responsible for processing incomming HTTP requests and returning HTTP responses - handle user-facing logic. 

CustomUser = get_user_model()

class LoggedInUserProfileView(RetrieveAPIView):
    ''' Returns profile information about the LOGGED-IN user '''
    permission_classes = [IsAuthenticated]
    serializer_class = LoggedInUserSerializer
    
    def get_object(self):
        # my_user = CustomUser.objects.get(username=self.request.user)
        my_user = get_object_or_404(CustomUser, username=self.request.user)
        return my_user
    
        
        
        # serializer = LoggedInUserSerializer(request.user)
        # print(serializer)
        # if serializer.is_valid:
        #     return Response(serializer.data, status=status.HTTP_200_OK)
        # else:
        #     return Response(status=status.HTTP_400_BAD_REQUEST)

class NormalUserProfileView(RetrieveAPIView):
    ''' Returns information about a SPECIFIC user '''
    permission_classes = [IsAuthenticated]
    serializer_class = NormalUserSerializer
    queryset = CustomUser.objects.all()
    
    lookup_field="username"
    http_method_names = ['get']
    

# NOT FINISHED, BELOW
class FollowUserView(APIView): # Currently workign with this
    ''' Follows specified user '''
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
    ''' Unfollows specified user '''
    permission_classes = [IsAuthenticated]
    
    def get(self, request, username):
        
        response = UserProfileService.unfollow_user(request, username)
        
        if response != None:
            print(f"Successfully unfollwed {response['user_to_unfollow']}")
            return Response(f"Successfully unfollwed {response['user_to_unfollow']}", status=status.HTTP_200_OK)

        else:
            print("Failed to unfollow")
            return Response("Failed to unfollow", status=status.HTTP_400_BAD_REQUEST)

class LoggedInUserAllFollowers(APIView):
    ''' Returns a list of users following the logged-in user '''
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        
        followers = MyProfileService.get_all_followers(request)
        print(followers.data)
        
        if followers.data is not None:            
            print("List of followers", followers.data)
            return Response(followers.data, status=status.HTTP_200_OK)
        else:
            print("You have no followers lol (or there is an error)", followers.errors)
            return Response("You have no followers lol (or there is an error)", status=status.HTTP_204_NO_CONTENT)


class LoggedInUserAllFollowing(ListAPIView):
    '''Returns a list of users that the logged-in user is following'''
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        
        following = MyProfileService.get_all_following(request)
        print(following.data)
        
        if following.data is not None:
            print("List of users that you are following", following.data)
            return Response(following.data, status=status.HTTP_200_OK)
        else:
            print("You are not following anybody")
            return Response("You are not following anybody", status=status.HTTP_204_NO_CONTENT)
