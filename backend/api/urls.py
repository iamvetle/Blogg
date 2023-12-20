# Libraries
from django.urls import path

# Local
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
from api.views.tag_views import TagsAllView
from api.views.other_views import HealthCheck


urlpatterns = [
    
    # General paths
    # path("search/", PostMultipleAfterSearchView.as_view(), name="search"),
    path("posts/feed/", PostMultipleSnippetView.as_view(), name="all_or_multiple_posts"),
    path("posts/following/", PostMultipleSnippetOnlyMyFollowingView.as_view(), name="all_or_multiple_following_posts"),
    path("posts/tags/", TagsAllView.as_view(), name="tags"),
    
    # Very specific and independent paths
    path("health_check/", HealthCheck.as_view(), name="health_check"),
    
    path("myuser/posts/", PostAllLoggedInUserView.as_view(), name="my_posts"),
    path("myuser/post/<int:pk>/edit/", PostEditSingleView.as_view(), name="edit_my_post"), # GET, DELETE, PATCH (update) weird if I don't have this?
    
    
    path("posts/saved/", PostAllSavedLoggedInUserView.as_view(), name="saved_posts"),
    path("post/<int:pk>/", PostReadSingleView.as_view(), name="single_post"),
    path("post/<int:post_id>/save/", PostSaveView.as_view(), name="save_unsave_post"),
    path("post/newpost/", PostCreateView.as_view(), name="new_post"),
    
    path("post/<int:post_id>/comments/", PostCommentsView.as_view(), name="post_comments"),
    path("post/<int:post_id>/add-comment/", PostAddCommentView.as_view(), name="add_comment_to_post" ),
    path("post/<int:post_id>/remove-comment/<int:comment_id>/", PostDeleteCommentView.as_view(), name="remove_comment_from_post" ),
    ]

