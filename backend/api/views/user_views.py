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


class FollowUserView(APIView):  # maybe change function type later
    """Follows specified user"""

    permission_classes = [IsAuthenticated]

    def get(self, request, username):
        response = UserProfileService.follow_user(request, username)

        if response["status"] != False:
            print(
                f"{response['current_user']} started following {response['user_to_follow']}"
            )  # print to self
            return Response(
                f"{response['current_user']} started following {response['user_to_follow']}",
                status=status.HTTP_200_OK,
            )
        else:
            print(
                f"{response['current_user']} did NOT start following {response['user_to_follow']}"
            )  # print to self
            return Response(
                f"{response['current_user']} did NOT start following {response['user_to_follow']}",
                status=status.HTTP_400_BAD_REQUEST,
            )  # print to self


class UnfollowUserView(APIView):  # maybe change function type later
    """Unfollows specified user"""

    permission_classes = [IsAuthenticated]

    def get(self, request, username):
        response = UserProfileService.unfollow_user(request, username)

        if response != None:
            print(f"Successfully unfollwed {response['user_to_unfollow']}")
            return Response(
                f"Successfully unfollowed {response['user_to_unfollow']}",
                status=status.HTTP_200_OK,
            )

        else:
            print("Failed to unfollow")
            return Response("Failed to unfollow", status=status.HTTP_400_BAD_REQUEST)


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
