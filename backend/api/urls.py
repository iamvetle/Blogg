# Libraries
from django.urls import path

# Local
from api.views.auth_views import LoginView, RegisterUserView
from api.views.post_views import (
    PostSingleView,
    PostCreateView,
    PostAllLoggedInUserView,
    PostMultipleSnippetView,
    PostSaveView,
    PostAllSavedLoggedInUserView,
    PostAllNormalUserView,
    PostDeleteView
)
from api.views.user_views import (
    LoggedInUserProfileView,
    NormalUserProfileView,
    FollowUserView,
    LoggedInUserAllFollowers,
    LoggedInUserAllFollowing,
    UnfollowUserView,
)
from api.views.tag_views import AllTagsView
from api.views.category_views import AllCategoriesView
from api.views.other_views import HealthCheck


urlpatterns = [
    
    # General paths
    # path("search/", PostMultipleAfterSearchView.as_view(), name="search"),
    path("feed/", PostMultipleSnippetView.as_view(), name="all_posts"),
    path("tags/", AllTagsView.as_view(), name="tags"),
    path("categories/", AllCategoriesView.as_view(), name="categories"),
    
    # Very specific and independent paths
    path("health_check/", HealthCheck.as_view(), name="health_check"),
    path("login/", LoginView.as_view(), name="login"),
    path("registrer/", RegisterUserView.as_view(), name="register_user"),
    
    # Paths related to the logged-in user
    path("min-side/", LoggedInUserProfileView.as_view(), name="min_side"),
    path("min-side/posts/", PostAllLoggedInUserView.as_view(), name="my_posts"),
    path("min-side/posts/<int:post_id>/delete/", PostDeleteView.as_view(), name="delete_my_post"),  
    path("min-side/followers/", LoggedInUserAllFollowers.as_view(), name="my_followers"),
    path("min-side/following/", LoggedInUserAllFollowing.as_view(), name="my_following"),
    
    # Posts and related actions
    path("newpost/", PostCreateView.as_view(), name="new_post"),
    
    path("posts/saved/", PostAllSavedLoggedInUserView.as_view(), name="saved_posts"),
    path("post/<int:pk>/", PostSingleView.as_view(), name="single_post"),
    path("post/<int:post_id>/save/", PostSaveView.as_view(), name="save_unsave_post"),
    
    # User-specific paths (Most general last)
    path("<str:username>/", NormalUserProfileView.as_view(), name="user_profile"),
    path("<str:username>/posts/", PostAllNormalUserView.as_view(), name="user_posts"),
    path("<str:username>/follow/", FollowUserView.as_view(), name="user_follow"),
    path("<str:username>/unfollow/", UnfollowUserView.as_view(), name="user_unfollow"),
]

