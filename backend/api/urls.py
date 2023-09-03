from django.urls import path
from api.views.auth_views import LoginView, RegisterUserView, HealthCheck 
from api.views.post_views import SinglePostView, CreatePostView, MyPosts, PostSnippetsView
from api.views.user_views import MyAccountView, UserProfileView


urlpatterns = [
    path("min-side/posts/", MyPosts.as_view(), name="myposts"),
    path("min-side/", MyAccountView.as_view(), name="min-side"),
    path("feed/", PostSnippetsView.as_view(), name="all_posts"),
    path("post/<int:pk>/", SinglePostView.as_view(), name="single_post"),
    path("login/", LoginView.as_view(), name="login"), 
    path("newpost/", CreatePostView.as_view(), name="new_post"),
    path("registrer/", RegisterUserView.as_view(), name="register_user"), # TODO: remove the 'api/' part
    path("<str:username>/", UserProfileView.as_view(), name="user_profile"),
    path("health_check/", HealthCheck.as_view(), name="health_check")
]