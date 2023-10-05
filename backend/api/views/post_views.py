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

# Local application imports
from api.models import Post, SavedPost
from api.serializers.post_serializers import PostSerializer, SavedPostSerializer, PostSnippetSerializer
from api.services.post_services import CreatePostService, PostSnippetService
from api.services.search_services import SearchService
from api.services.pagination_services import CustomLimitOffsetPagination

CustomUser = get_user_model()


class MyPosts(APIView):
    ''' Retrieves all posts created by the logged in user '''
    permission_classes = [IsAuthenticated]

    def get(self, request):
        author = request.user.id
        queryset = Post.objects.filter(author_id=author)
        serializer = PostSerializer(queryset, many=True)

        if serializer.is_valid:
            return Response(serializer.data, status=status.HTTP_200_OK)


# not used at the moment
class AllPostsView(APIView):
    ''' Retrieves all posts '''
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = Post.objects.all().order_by("-date_published")
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PostSnippetsView(APIView):
    ''' Retrieves all posts as snippets, and returns paginated '''
    permission_classes = [IsAuthenticated]

    def get(self, request):
        response = PostSnippetService.get_posts(request)
        return Response(response, status=status.HTTP_200_OK)


class SinglePostView(APIView):
    ''' Retrieves a single post '''
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CreatePostView(APIView):
    ''' Creates a new post '''
    permission_classes = [IsAuthenticated]

    def post(self, request):
        post_data = request

        response = CreatePostService.create_new_post(post_data)

        if response is not None:
            print(response.data)
            return Response(response.data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class SearchView(APIView):  ## filters based on post title
    ''' Filters posts based on the request query '''
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

        serializer = PostSnippetSerializer(paginated_results, many=True)
        response = paginator.get_paginated_response(serializer.data)

        if response != None:
            return Response(response, status=status.HTTP_200_OK)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class SavePostView(APIView):
    ''' Saves or un-saves a requested post for the user'''
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
                return Response({'message': 'Post unsaved'}, status=status.HTTP_200_OK)

            saved_post = SavedPost.objects.create(user=user, post=post)
            # Saves the post
            
            serializer = SavedPostSerializer(saved_post)
            
            if serializer.is_valid:
                return Response(serializer.data, status=status.HTTP_201_CREATED)

class AllSavedPosts(APIView):
    ''' Retrieves all posts the user has saved '''
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        saved_posts = Post.objects()
