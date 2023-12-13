# Standard Django
from django.urls import path

# Local
from users.views.auth_views import LoginView, RegisterUserView

from users.views.user_views import (
    LoggedInUserProfileView,
    NormalUserProfileView,
    FollowUserView,
    LoggedInUserAllFollowers,
    LoggedInUserAllFollowing,
    UnfollowUserView,
    LoggedInUserAddOrChangeProfilePicture
)

# from API app
from api.views.post_views import PostAllNormalUserView

urlpatterns = [
    # Authentication paths
    path("login/", LoginView.as_view(), name="login"),
    path("register/", RegisterUserView.as_view(), name="register_user"),
    
    # Paths related to the logged-in user
    path("myuser/", LoggedInUserProfileView.as_view(), name="min_side"),
    path("myuser/profile_picture/edit/", LoggedInUserAddOrChangeProfilePicture.as_view(), name="edit_logged_in_user_profile_picture"),
    
    path("myuser/followers/", LoggedInUserAllFollowers.as_view(), name="my_followers"),
    path("myuser/following/", LoggedInUserAllFollowing.as_view(), name="my_following"),
    
    # User-specific paths (Most general last)
    path("<str:username>/", NormalUserProfileView.as_view(), name="user_profile"),
    path("<str:username>/posts/", PostAllNormalUserView.as_view(), name="user_posts"),
    path("<str:username>/follow/", FollowUserView.as_view(), name="user_follow"),
    path("<str:username>/unfollow/", UnfollowUserView.as_view(), name="user_unfollow"),
]

