# Standard libraries
from django.db import transaction
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist

# Third-party libraries

# Django Rest Framework
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView


# Django Filter
from django_filters.rest_framework import DjangoFilterBackend
from api.services.pagination_services import CustomLimitOffsetPagination
from api.pagination import CustomLimitOffsetPagination as GenericPagination

# Local application imports
from api.models import Post, SavedPost
from api.serializers.post_serializers import (
    PostSerializer,
    PostSaveStyleSerializer,
    PostShortenSerializer,
)
from api.serializers.user_serializers import NormalUserSerializer 
from api.filters import PostFilter
from api.services.post_services import CreatePostService, PostSnippetService
from api.services.search_services import SearchService

CustomUser = get_user_model()

# queryset = Post.objects.all().order_by("-date_published")

class PostAllLoggedInUserView(ListAPIView): # /api/min-side/posts/
    """Retrieves all posts (in snippets) created by the logged in user"""
    permission_classes = [IsAuthenticated]
    serializer_class = PostShortenSerializer
    pagination_class = GenericPagination
    
    http_method_names = ['get']
    
    def get_queryset(self):
        logged_in_user = self.request.user
        
        return logged_in_user.posts.all()

class PostAllSavedLoggedInUserView(ListAPIView): # /api/saved/
    """Retrieves a small part of all posts saved by the user"""
    permission_classes = [IsAuthenticated]
    serializer_class = PostSaveStyleSerializer
    
    http_method_names = ['get']
    
    def get_queryset(self):
        logged_in_user = self.request.user
        
        return logged_in_user.saved_posts.all()

class PostAllNormalUserView(ListAPIView): # /api/<str:username>/
    """Returns information about a specified user"""

    permission_classes = [IsAuthenticated]
    serializer_class = PostShortenSerializer
    pagination_class = GenericPagination
    queryset = Post.objects.all()

    http_method_names = ['get']

    def get_queryset(self):
        queryset = super().get_queryset()
        username = self.kwargs["username"]
        queryset = queryset.filter(author__username=username)
        
        return queryset

class PostMultipleSnippetView(ListAPIView): # /api/feed/
    """Responds {x} amount of posts as snippets"""

    permission_classes = [IsAuthenticated]
    serializer_class = PostShortenSerializer
    pagination_class = GenericPagination
    
    filter_backends = [DjangoFilterBackend]
    filterset_class = PostFilter
    
    queryset = Post.objects.all()

    http_method_names = ["get"]
class PostMultipleAfterSearchView(APIView): # /api/search/   
    """Responses with a filter list of {x} amount of posts""" # for filtering options look at filters.py
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        query = request.query_params.get("q", None)

        if query is not None:
            queryset = SearchService.filtered_search(request)
            # Filters the search

            if queryset is None:
                return Response("No results found", status=status.HTTP_400_BAD_REQUEST)
        else:
            queryset = Post.objects.all()

        paginator = CustomLimitOffsetPagination()
        paginated_results = paginator.paginate_queryset(queryset, request)

        serializer = PostShortenSerializer(paginated_results, many=True)
        response = paginator.get_paginated_response(serializer.data)

        if response != None:
            return Response(response, status=status.HTTP_200_OK)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class PostSingleView(RetrieveAPIView):
    """Retrieves a single post"""
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer
    lookup_field = "pk"
    queryset = Post.objects.all()

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
    """Creates a new post"""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        post_data = request

        response = CreatePostService.create_new_post(post_data)

        if response is not None:
            print(response.data)
            return Response(response.data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
