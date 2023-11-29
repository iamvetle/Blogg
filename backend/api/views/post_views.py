# Standard libraries
from django.db import transaction
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.filters import SearchFilter
from django.core.exceptions import ObjectDoesNotExist, PermissionDenied

# Third-party libraries

# Django Rest Framework
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    GenericAPIView,
    RetrieveUpdateDestroyAPIView,
    CreateAPIView,
    DestroyAPIView,
)

from rest_framework import parsers
# Django Filter
from django_filters import rest_framework as filters
from api.pagination import CustomLimitOffsetPagination as GenericPagination

# Local application imports
from api.models import Post, SavedPost, Comment, PostImage, PostVideo
from api.serializers.post_serializers import (
    PostSerializer,
    PostSaveStyleSerializer,
    PostShortenSerializer,
    CommentSerializer,
)
from api.serializers.user_serializers import NormalUserSerializer
from api.filters import CustomPostFilter

from bs4 import BeautifulSoup

from django.core.exceptions import ValidationError

from PIL import Image
from django.core.files.base import ContentFile
from io import BytesIO

CustomUser = get_user_model()

class PostAllLoggedInUserView(ListAPIView):  # /api/min-side/posts/
    """Retrieves all posts (in snippets) created by the logged in user"""

    permission_classes = [IsAuthenticated]
    serializer_class = PostShortenSerializer

    http_method_names = ["get"]

    def get_queryset(self):
        logged_in_user = self.request.user

        return logged_in_user.posts.all()


class PostAllSavedLoggedInUserView(ListAPIView):  # /api/saved/
    """Retrieves a small part of all posts saved by the user"""

    permission_classes = [IsAuthenticated]
    serializer_class = PostSaveStyleSerializer

    http_method_names = ["get"]

    def get_queryset(self):
        logged_in_user = self.request.user

        return logged_in_user.saved_posts.all()


class PostAllNormalUserView(ListAPIView):  # /api/<str:username>/
    """Returns All of the posts (snippets) made by the specified user"""

    permission_classes = [IsAuthenticated]
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

    permission_classes = [IsAuthenticated]
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
    permission_classes = [IsAuthenticated]
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

    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer
    lookup_field = "pk"
    queryset = Post.objects.all()

    http_method_names = ["get"]


class PostEditSingleView(RetrieveUpdateDestroyAPIView):
    """Retrieves, updates or deletes a single post"""

    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer
    lookup_field = "pk"
    queryset = Post.objects.all()

    http_method_names = ["get", "patch", "delete"]

    def get_queryset(self):
        all_posts = super().get_queryset()
        posts_only_made_by_the_user = all_posts.filter(author=self.request.user)

        return posts_only_made_by_the_user


class PostDeleteView(APIView):
    """Deletes a post, if ask for by the user owning the post"""

    permission_classes = [IsAuthenticated]

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

    permission_classes = [IsAuthenticated]

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
                return Response({"message": "Post unsaved"}, status=status.HTTP_200_OK)

            saved_post = SavedPost.objects.create(user=user, post=post)
            # Saves the post

            serializer = PostSaveStyleSerializer(saved_post)

            if serializer.is_valid:
                return Response(
                    {"message": "Post saved", "post": serializer.data},
                    status=status.HTTP_201_CREATED,
                )

class PostCreateView(APIView):
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def post(self, request, *args, **kwargs):
        try:
            title = request.data.get('title')
            content = request.data.get('content')
            if not title or not content:
                return Response({'error': 'Title and content are required.'}, status=status.HTTP_400_BAD_REQUEST)

            post = Post.objects.create(title=title, content=content, author=request.user)

            image_map = {}
            for key, image_file in request.FILES.items():
                # Open the uploaded image using Pillow
                image = Image.open(image_file)

                # Compress and convert the image to WebP
                output = BytesIO()
                image.save(output, format='WEBP', quality=80)
                output.seek(0)

                # Create a new Django file-like object for the WebP image
                webp_file = ContentFile(output.read(), name=image_file.name.split('.')[0] + '.webp')

                # Create the PostImage instance with the converted WebP image
                image_instance = PostImage.objects.create(post=post, image=webp_file)
                image_map[key.split("_")[1]] = image_instance.image.url

            soup = BeautifulSoup(content, 'html.parser')
            for img in soup.find_all('img'):
                alt_text = img.get('alt')
                if alt_text in image_map:
                    relativeImageSource = image_map[alt_text]
                    actualFullImageSource = f"http://localhost:8888{relativeImageSource}"                    
                    img['src'] = actualFullImageSource

            post.content = str(soup)
            post.save()

            return Response({'status': 'Post created successfully'}, status=status.HTTP_201_CREATED)

        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Log the exception for debugging
            return Response({'error': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PostCommentsView(ListAPIView):
    """Returns all of the comments associated with a post"""

    permission_classes = [IsAuthenticated]
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

    permission_classes = [IsAuthenticated]
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
    permission_classes = [IsAuthenticated]
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
