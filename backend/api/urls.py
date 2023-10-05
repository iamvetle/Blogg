from django.urls import path
from api.views.auth_views import LoginView, RegisterUserView
from api.views.post_views import SinglePostView, CreatePostView, MyPosts, PostSnippetsView, SearchView, SavePostView, AllSavedPosts
from api.views.user_views import MyAccountView, UserProfileView, FollowUserView, CurrentFollowersView, UnfollowUserView
from api.views.tag_views import AllTagsView
from api.views.category_views import AllCategoriesView
from api.views.other_views import HealthCheck 


urlpatterns = [
    path("health_check/", HealthCheck.as_view(), name="health_check"), # Ping-ish
    path("search/", SearchView.as_view(), name="search"),
    path("tags/", AllTagsView.as_view(), name="tags"),
    path("categories/", AllCategoriesView.as_view(), name="tags"),
    path("min-side/posts/", MyPosts.as_view(), name="myposts"),
    path("min-side/followers/", CurrentFollowersView.as_view(), name="my_followers"),
    # not a minside/follownig??
    path("min-side/", MyAccountView.as_view(), name="min_side"),
    path("feed/", PostSnippetsView.as_view(), name="all_posts"), # in snippets
    path("login/", LoginView.as_view(), name="login"), # TODO: change to auth/ later
    #path("loggout/", LoggoutView.as_view(), name="loggout"), 
    path("newpost/", CreatePostView.as_view(), name="new_post"),
    path("registrer/", RegisterUserView.as_view(), name="register_user"),
    path("<str:username>/follow/", FollowUserView.as_view(), name="user_follow"),
    path("<str:username>/unfollow/", UnfollowUserView.as_view(), name="user_unfollow"),
    path("posts/saved/", AllSavedPosts.as_view(), name="saved_posts"),
    path("<str:username>/", UserProfileView.as_view(), name="user_profile"), # <- Don't move
    path('post/<int:post_id>/save/', SavePostView.as_view(), name="save_unsave_post"),
    path("post/<int:pk>/", SinglePostView.as_view(), name="single_post"), # <- Don't move
    
]       