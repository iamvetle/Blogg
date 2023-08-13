from django.urls import path
from .views import MyAccountView, UserProfileView 

urlpatterns = [
    # path("auth/"), # authenticates user
    path("myaccount/", MyAccountView.as_view(), name="my_account"), # my account
    path("user/<int:id>/", UserProfileView.as_view(),  name="profile") # different user profile
    # path("") # feed or "go get logged in"-page
    # path("post/<int:id>") # specific post
]