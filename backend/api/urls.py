from django.urls import path
from .views import MyAccountView,  AllPostsView, SinglePostView, LoginView, NewPostView, RegisterUserView

urlpatterns = [

    path("myuser/", MyAccountView.as_view(), name="myuser"),
    path("feed/", AllPostsView.as_view(), name="all_posts"),
    path("post/<int:pk>/", SinglePostView.as_view(), name="single_post"),
    path("login/", LoginView.as_view(), name="login"), 
    path("newpost/", NewPostView.as_view(), name="new_post"),
    path("registrer/", RegisterUserView.as_view(), name="register_user"), # TODO: remove the 'api/' part
]