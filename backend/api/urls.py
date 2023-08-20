from django.urls import path
from .views import MyAccountView, UserProfileView, PostView, IndividualPostView, LoginView

urlpatterns = [
    # path("auth/"), # authenticates user
    #path("myaccount/", MyAccountView.as_view(), name="my_account"), # my account
    #path("user/<int:id>/", UserProfileView.as_view(),  name="profile"), # different user profile
    path("myuser/", MyAccountView.as_view(), name="myuser"),
    path("feed/", PostView.as_view(), name="feed"),
    path("post/<int:pk>/", IndividualPostView.as_view(), name="post_full_view"),
    path("login/", LoginView.as_view(), name="login"), 
    # path("") # feed or "go get logged in"-page
    # path("post/<int:id>") # specific post
]