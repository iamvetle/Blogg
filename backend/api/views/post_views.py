# Standard libraries
from django.db import transaction
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.filters import SearchFilter
from django.core.exceptions import ObjectDoesNotExist, PermissionDenied

# Django Rest Framework
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    RetrieveUpdateDestroyAPIView,
    CreateAPIView,
    DestroyAPIView,
)

# Django Filter
from django_filters import rest_framework as filters
from api.pagination import CustomLimitOffsetPagination as GenericPagination

# Local application imports
from api.models import Post, SavedPost, Comment
from api.serializers.post_serializers import (
    PostSerializer,
    PostSaveStyleSerializer,
    PostShortenSerializer,
)
from api.serializers.comment_serializers import CommentSerializer

# Filter
from api.filters import CustomPostFilter

# The active user model in the app
CustomUser = get_user_model()


class PostAllLoggedInUserView(ListAPIView):  # /api/min-side/posts/
    """Retrieves all posts (in snippets) created by the logged in user"""

    permission_classes = [IsAuthenticated]  # NEEDS to be authenticated
    serializer_class = PostShortenSerializer

    http_method_names = ["get"]

    def get_queryset(self):
        # It is only the logged in users post that are returned
        logged_in_user = self.request.user

        return logged_in_user.posts.all()


class PostAllSavedLoggedInUserView(ListAPIView):  # /api/saved/
    """Retrieves a small part of all posts saved by the user"""

    permission_classes = [IsAuthenticated]  # NEEDS to be authenticated
    serializer_class = PostSaveStyleSerializer

    http_method_names = ["get"]

    def get_queryset(self):
        # It is only the logged in user that returned
        logged_in_user = self.request.user

        return logged_in_user.saved_posts.all()


class PostAllNormalUserView(ListAPIView):  # /api/<str:username>/
    """Returns ALL of the posts (snippets) made by the specified user"""

    # permission_classes = [AllowAny] # Does NOT have to authenticated

    serializer_class = PostShortenSerializer
    pagination_class = GenericPagination
    queryset = Post.objects.all()

    http_method_names = ["get"]

    def get_queryset(self):
        queryset = super().get_queryset()
        username = self.kwargs["username"]
        queryset = queryset.filter(author__username=username)

        return queryset


class PostMultipleSnippetView(ListAPIView):  # /api/feed/
    """Responds {x} amount of posts as snippets.
    The response is tailored after the search and filter parameters in the url fetch."""

    permission_classes = [AllowAny]  # Does NOT have to authenticated

    serializer_class = PostShortenSerializer
    # It paginates automatically - se settings.py
    filter_backends = [
        filters.DjangoFilterBackend,
        SearchFilter,
    ]

    filterset_class = CustomPostFilter
    search_fields = ["title", "content", "author__username"]

    # Makes sure that the *newest* posts are listed first by the frontend
    queryset = Post.objects.all().order_by("-date_published")

    http_method_names = ["get"]


class PostMultipleSnippetOnlyMyFollowingView(ListAPIView):
    """Returns a list of all of the users the logged in user is following"""

    permission_classes = [IsAuthenticated]  # NEEDS to be authenticated
    serializer_class = PostShortenSerializer

    # Makes sure that the *newest* posts are listed first by the frontend
    queryset = Post.objects.all().order_by("-date_published")

    http_method_names = ["get"]

    def get_queryset(self):
        queryset_posts_all = super().get_queryset()

        queryset_following_all = self.request.user.following.all()

        filtered_queryset = queryset_posts_all.filter(author__in=queryset_following_all)

        return filtered_queryset


class PostReadSingleView(RetrieveAPIView):
    """Retrieves a single post to read"""

    # ? this means that all web clients can read all posts - do I want that?
    permission_classes = [AllowAny]  # Does NOT have to authenticated

    serializer_class = PostSerializer
    lookup_field = "pk"
    queryset = Post.objects.all()

    http_method_names = ["get"]


# ! makes this into 3 THREE different views (as well as urls)
class PostEditSingleView(RetrieveUpdateDestroyAPIView):
    """Retrieves, updates or deletes a single post"""

    permission_classes = [IsAuthenticated]  # NEED to be authenticated
    serializer_class = PostSerializer
    lookup_field = "pk"
    queryset = Post.objects.all()

    http_method_names = ["get", "patch", "delete"]

    def get_queryset(self):
        all_posts = super().get_queryset()
        # Only the logged in user get delete it's own post
        posts_only_made_by_the_user = all_posts.filter(author=self.request.user)

        return posts_only_made_by_the_user


# * not in use
class PostDeleteView(APIView):
    """Deletes a post, if ask for by the user owning the post"""

    permission_classes = [IsAuthenticated]  # NEEDS to be authenticated

    def delete(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)

        if post.author != request.user:
            return Response(
                status=status.HTTP_403_FORBIDDEN,
                data={"detail": "You do not have permission to delete this post."},
            )
        else:
            post.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


class PostSaveView(APIView):
    """Saves or un-saves a requested post for the user"""

    permission_classes = [IsAuthenticated]  # NEED to be authenticated

    # ? might be overly complicated
    def post(self, request, post_id):
        user = request.user

        try:
            post = Post.objects.get(id=post_id)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        with transaction.atomic():
            # Check if the post is already saved by the user
            already_saved = SavedPost.objects.filter(user=user, post=post).exists()

            if already_saved:
                # If already saved, remove it from saved posts
                SavedPost.objects.filter(user=user, post=post).delete()
                return Response({"detail": "Post unsaved"}, status=status.HTTP_200_OK)

            saved_post = SavedPost.objects.create(user=user, post=post)
            # Saves the post

            serializer = PostSaveStyleSerializer(saved_post)

            if serializer.is_valid:
                return Response(
                    {"detail": "Post saved"},
                    status=status.HTTP_201_CREATED,
                )

class PostCommentsView(ListAPIView):
    """Returns all of the comments associated with a post"""

    permission_classes = [AllowAny]  # Does NOT have to authenticated

    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    pagination_class = None

    http_method_names = ["get"]

    def get_queryset(self):
        queryset = super().get_queryset()
        post_id = self.kwargs["post_id"]

        filtered_queryset = queryset.filter(post=post_id)

        return filtered_queryset


class PostAddCommentView(CreateAPIView):
    """Adds a comment to a specified post"""

    permission_classes = [IsAuthenticated]  # NEED to be authenticated
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    http_method_names = ["post"]

    def perform_create(self, serializer):
        # Retrieves the <int:post_id> from the url
        id = self.kwargs["post_id"]

        # Retrieves the content data from the request
        content = self.request.data["content"]

        # Based on 'id' the associated post is retrieved
        post = get_object_or_404(Post, pk=id)

        # Finally a new object is created and saved
        serializer.save(post=post, content=content, author=self.request.user)


class PostDeleteCommentView(DestroyAPIView):
    """Deletes a comment from a specified post"""

    queryset = Comment.objects.all()
    permission_classes = [IsAuthenticated]  # NEED to be authenticated
    serializer_class = CommentSerializer

    lookup_field = "id"
    lookup_url_kwarg = "comment_id"

    http_method_names = ["delete"]

    # This method makes sure that the object, or comment that was retrieved
    # has the author who owns the comment
    def get_object(self):
        # The comment that is going to be deleted
        comment = super().get_object()
        post_owner = comment.post.author
        print(post_owner)

        # Only if the author is the same as the web client will the object be returned
        # OR
        # The owner of the post that has the comment
        if (comment.author == self.request.user) | (post_owner == self.request.user):
            return comment
        else:
            raise PermissionDenied(
                "You cannot delete comments made by other people (unless you are the owner of the post - which it seems like you are not)"
            )
