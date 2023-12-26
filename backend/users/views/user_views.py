# Standard libraries
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist, ValidationError

# Third-party libraries

## Django Rest Framework
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, ListCreateAPIView, CreateAPIView, RetrieveUpdateAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework.parsers import MultiPartParser, FormParser

# Pillow (?)

from PIL import Image
from django.core.files.base import ContentFile
from io import BytesIO
import uuid


# Local application imports
from django.shortcuts import get_object_or_404
from users.serializers.user_serializers import (
    LoggedInUserSerializer,
    NormalUserSerializer,
    FollowerSerializer,
)

# A view is responsible for processing incomming HTTP requests and returning HTTP responses - handle user-facing logic.

CustomUser = get_user_model()

class LoggedInUserProfileView(RetrieveUpdateAPIView):
    """Returns and updates profile information about the LOGGED-IN user"""
    permission_classes = [IsAuthenticated] # NEED to be authenticated
    serializer_class = LoggedInUserSerializer
    
    http_method_names = ["get", "patch", "post"]

    def get_object(self):
        # Retrieve the CustomUser instance for the logged-in user
        return get_object_or_404(CustomUser, username=self.request.user)

    # # ! this is not in use I think
    def perform_update(self, serializer):
        serializer.save(partial=True)

class NormalUserProfileView(RetrieveAPIView):
    """Returns information about a SPECIFIC user"""
    # ? Do I want ALL the information about the user to be returned?
    permission_classes = [AllowAny] # Does NOT have to authenticated

    serializer_class = NormalUserSerializer
    queryset = CustomUser.objects.all()

    lookup_field = "username"
    http_method_names = ["get"]

class FollowUserView(RetrieveAPIView):
    """Follows specified user"""
    
    permission_classes = [IsAuthenticated] # NEEDS to be authenticated
    
    pagination_class = None
    serializer_class = FollowerSerializer
    
    queryset = CustomUser.objects.all()
    lookup_field = 'username'
    
    http_method_names = ['post']
    
    def post(self, request, *args, **kwargs):
        
        try:
            username = self.get_object()
        except ObjectDoesNotExist:
            return Response({ "error": "User doesn't exist" }, status=status.HTTP_404_NOT_FOUND)  

        if username == request.user:
            return Response({ "error": "You can't follow yourself" }, status=status.HTTP_400_BAD_REQUEST)
                
        if username in request.user.following.all():
            return Response({ "detail": "You are already following this user" }, status=status.HTTP_400_BAD_REQUEST)           
        else:
            request.user.following.add(username)
            return Response({ "detail": "Started following" }, status=status.HTTP_200_OK)        

class UnfollowUserView(RetrieveAPIView):
    """Unfollows specified user"""
    permission_classes = [IsAuthenticated] # NEEDS to be authenticated
    
    pagination_class = None
    serializer_class = FollowerSerializer
    
    queryset = CustomUser.objects.all()
    lookup_field = 'username'
    
    http_method_names = ['post']
    
    def post(self, request, *args, **kwargs):
        
        try:
            username = self.get_object()
        except ObjectDoesNotExist:
            return Response({ "error": "User doesn't exist" }, status=status.HTTP_404_NOT_FOUND)  

        if username == request.user:
            return Response({ "error": "You can't unfollow yourself" }, status=status.HTTP_400_BAD_REQUEST)
                
        if username not in request.user.following.all():
            return Response({ "error": "You are not following this user. There is nobody to unfollow" }, status=status.HTTP_400_BAD_REQUEST)           
        else:
            request.user.following.remove(username)
            return Response({ "detail": "Unfollowed user" }, status=status.HTTP_200_OK)     

class LoggedInUserAllFollowers(ListAPIView):
    """Returns a list of users following the logged-in user"""

    permission_classes = [IsAuthenticated] # NEEDS to be authenticated
    pagination_class = None

    serializer_class = FollowerSerializer

    def get_queryset(self):
        logged_in_user = self.request.user
        followers_list = logged_in_user.followers.all()

        return followers_list


class LoggedInUserAllFollowing(ListAPIView):
    """Returns a list of users that the logged-in user is following"""

    permission_classes = [IsAuthenticated] # NEEDS to be authenticated

    serializer_class = FollowerSerializer
    pagination_class = None

    def get_queryset(self):
        logged_in_user = self.request.user
        # Only a list whom the logged in user is following is returned
        user_is_following = logged_in_user.following.all()

        return user_is_following
    
class LoggedInUserAddOrChangeProfilePicture(APIView):
    """Adds, Changes, or Deletes a profile picture of the logged in user. Saves it with a UUID id in webp format"""
    
    permission_classes = [IsAuthenticated] # NEEDS to be authenticated

    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        user = request.user

        profile_picture = request.FILES.get('profile_picture', None)
        if profile_picture:
            try:
                # Open the uploaded image using Pillow
                image = Image.open(profile_picture)

                # Compress and convert the image to WebP
                output = BytesIO()
                image.save(output, format='WEBP', quality=80)
                output.seek(0)

                # Generate a unique file name using UUID
                unique_filename = f"{uuid.uuid4()}.webp"

                # Create a new Django file-like object for the WebP image
                webp_file = ContentFile(output.read(), name=unique_filename)

                user.profile_picture = webp_file
                user.save()

                return Response({'detail': 'Profile picture updated successfully'}, status=status.HTTP_200_OK)
            except ValidationError as e:
                # Handle any validation errors
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'No profile picture provided'}, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, format=None):
        user = request.user

        if user.profile_picture:
            
            #? What is the difference between the two?
            
            # This deletes the file from the storage
            user.profile_picture.delete()
            
            # This removes the association in the database
            user.profile_picture = None   
            
            user.save()
            return Response({'detail': 'Profile picture deleted successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No profile picture to delete'}, status=status.HTTP_400_BAD_REQUEST)