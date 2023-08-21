from django.urls import path
from .views import MyAccountView, UserProfileView, AllPostsView, SinglePostView, LoginView, NewPostView

urlpatterns = [

    path("myuser/", MyAccountView.as_view(), name="myuser"),
    path("feed/", AllPostsView.as_view(), name="all_posts"),
    path("post/<int:pk>/", SinglePostView.as_view(), name="single_post"),
    path("login/", LoginView.as_view(), name="login"), 
    path("newpost/", NewPostView.as_view(), name="new_post"),
]