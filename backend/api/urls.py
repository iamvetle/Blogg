from django.urls import path
from api.views.auth_views import LoginView, RegisterUserView
from api.views.post_views import SinglePostView, CreatePostView, MyPosts, PostSnippetsView, SearchView
from api.views.user_views import MyAccountView, UserProfileView, FollowUserView, CurrentFollowersView, UnfollowUserView
from api.views.other_views import HealthCheck 


urlpatterns = [
    path("health_check/", HealthCheck.as_view(), name="health_check"), # Ping-ish
    path("search/", SearchView.as_view(), name="search"),
    path("min-side/posts/", MyPosts.as_view(), name="myposts"),
    path("min-side/followers/", CurrentFollowersView.as_view(), name="my_followers"),
    path("min-side/", MyAccountView.as_view(), name="min-side"),
    path("feed/", PostSnippetsView.as_view(), name="all_posts"), # in snippets
    path("login/", LoginView.as_view(), name="login"), 
    #path("loggout/", LoggoutView.as_view(), name="loggout"), 
    path("newpost/", CreatePostView.as_view(), name="new_post"),
    path("registrer/", RegisterUserView.as_view(), name="register_user"),
    path("<str:username>/follow/", FollowUserView.as_view(), name="user_follow"),
    path("<str:username>/unfollow/", UnfollowUserView.as_view(), name="user_unfollow"),
    path("<str:username>/", UserProfileView.as_view(), name="user_profile"), # <- Don't move
    path("post/<int:pk>/", SinglePostView.as_view(), name="single_post"), # <- Don't move
]    