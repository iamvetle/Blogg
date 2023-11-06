# Libraries
from django.urls import path

# Local
from api.views.auth_views import LoginView, RegisterUserView
from api.views.post_views import (
    PostReadSingleView,
    PostCreateView,
    PostAllLoggedInUserView,
    PostMultipleSnippetView,
    PostMultipleSnippetOnlyMyFollowingView,
    PostSaveView,
    PostAllSavedLoggedInUserView,
    PostAllNormalUserView,
    PostDeleteView,
    PostEditSingleView,
    PostCommentsView,
    PostAddCommentView,
    PostDeleteCommentView
    
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
    path("feed/", PostMultipleSnippetView.as_view(), name="all_or_multiple_posts"),
    path("feed/following/", PostMultipleSnippetOnlyMyFollowingView.as_view(), name="all_or_multiple_following_posts"),
    path("tags/", AllTagsView.as_view(), name="tags"),
    path("categories/", AllCategoriesView.as_view(), name="categories"),
    
    # Very specific and independent paths
    path("health_check/", HealthCheck.as_view(), name="health_check"),
    path("login/", LoginView.as_view(), name="login"),
    path("registrer/", RegisterUserView.as_view(), name="register_user"),
    
    # Paths related to the logged-in user
    path("min-side/", LoggedInUserProfileView.as_view(), name="min_side"),
    path("min-side/posts/", PostAllLoggedInUserView.as_view(), name="my_posts"),
    
    # NOT ACTIVE path("min-side/posts/<int:pk>/", PostEditSingleView.as_view(), name="edit_my_post"), # GET, DELETE, PATCH (update) weird if I don't have this?
    # NOT ACTIVE path("min-side/posts/<int:pk>/add-image/", PostEditSingleView.as_view(), name="add-image-to-post"), # POST add image
    # NOT ACTIVE path("min-side/posts/<int:pk>/remove-image/<int:image_id>/", PostEditSingleView.as_view(), name="remove-image-from-post"), # DELETE Image
    
    path("min-side/followers/", LoggedInUserAllFollowers.as_view(), name="my_followers"),
    path("min-side/following/", LoggedInUserAllFollowing.as_view(), name="my_following"),
    
    # Posts and related actions
    path("newpost/", PostCreateView.as_view(), name="new_post"),
    
    path("posts/saved/", PostAllSavedLoggedInUserView.as_view(), name="saved_posts"),
    path("post/<int:pk>/", PostReadSingleView.as_view(), name="single_post"),
    path("post/<int:post_id>/save/", PostSaveView.as_view(), name="save_unsave_post"),
    
    path("post/<int:post_id>/comments/", PostCommentsView.as_view(), name="post_comments"),
    path("post/<int:post_id>/add-comment/", PostAddCommentView.as_view(), name="add_comment_to_post" ),
    path("post/<int:post_id>/remove-comment/<int:comment_id>/", PostDeleteCommentView.as_view(), name="remove_comment_from_post" ),
    
    # User-specific paths (Most general last)
    path("<str:username>/", NormalUserProfileView.as_view(), name="user_profile"),
    path("<str:username>/posts/", PostAllNormalUserView.as_view(), name="user_posts"),
    path("<str:username>/follow/", FollowUserView.as_view(), name="user_follow"),
    path("<str:username>/unfollow/", UnfollowUserView.as_view(), name="user_unfollow"),
]

