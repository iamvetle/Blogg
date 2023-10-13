# Libraries
from django.urls import path

# Local
from api.views.auth_views import LoginView, RegisterUserView
from api.views.post_views import (
    PostSingleView,
    PostCreateView,
    PostAllLoggedInUserView,
    PostMultipleShortenedView,
    PostMultipleAfterSearchView,
    PostSaveView,
    PostAllSavedLoggedInUserView,
)
from api.views.user_views import (
    LoggedInUserProfileView,
    NormalUserProfileView,
    FollowUserView,
    CurrentFollowersView,
    UnfollowUserView,
    CurrentFollowingView,
)
from api.views.tag_views import AllTagsView
from api.views.category_views import AllCategoriesView
from api.views.other_views import HealthCheck


urlpatterns = [
    path("health_check/", HealthCheck.as_view(), name="health_check"),  # Ping-ish
    path("search/", PostMultipleAfterSearchView.as_view(), name="search"),
    path("tags/", AllTagsView.as_view(), name="tags"),
    path("categories/", AllCategoriesView.as_view(), name="tags"),
    path("min-side/posts/", PostAllLoggedInUserView.as_view(), name="my_posts"),
    path("min-side/followers/", CurrentFollowersView.as_view(), name="my_followers"),
    path("min-side/", LoggedInUserProfileView.as_view(), name="min_side"),
    path("feed/", PostMultipleShortenedView.as_view(), name="all_posts"),
    path("login/", LoginView.as_view(), name="login"),
    # path("loggout/", LoggoutView.as_view(), name="loggout"),
    path("registrer/", RegisterUserView.as_view(), name="register_user"),
    path("newpost/", PostCreateView.as_view(), name="new_post"),
    path("<str:username>/follow/", FollowUserView.as_view(), name="user_follow"),
    path("<str:username>/unfollow/", UnfollowUserView.as_view(), name="user_unfollow"),
    path(
        "<str:username>/", NormalUserProfileView.as_view(), name="user_profile"
    ),  # <- Don't move
    path("posts/saved/", PostAllSavedLoggedInUserView.as_view(), name="saved_posts"),
    path("post/<int:post_id>/save/", PostSaveView.as_view(), name="save_unsave_post"),
    path(
        "post/<int:pk>/", PostSingleView.as_view(), name="single_post"
    ),  # <- Don't move
    path("min-side/following/", CurrentFollowingView.as_view(), name="me_following"),
]
