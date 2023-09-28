from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import PostSerializer, PostSnippetSerializer
from rest_framework import status
from ..models import Post
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from api.services.post_services import CreatePostService, PostSnippetService
from api.services.search_services import SearchService
from rest_framework.response import Response
from api.services.pagination_services import CustomLimitOffsetPagination

CustomUser = get_user_model()

class MyPosts(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        author = request.user.id
        queryset = Post.objects.filter(author_id=author)
        serializer = PostSerializer(queryset, many=True)
        
        if serializer.is_valid:
            return Response(serializer.data, status=status.HTTP_200_OK)

# not used at the moment
class AllPostsView(APIView): 
    """ retrieves all posts if client is authenticated """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        queryset = Post.objects.all().order_by('-date_published')
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
class PostSnippetsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        response = PostSnippetService.get_posts(request)
        return Response(response, status=status.HTTP_200_OK)

class SinglePostView(APIView): # Retrieves a specific post
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
class CreatePostView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        post_data = request 

        response = CreatePostService.create_new_post(post_data)

        if response is not None:
            print(response.data)
            return Response(response.data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        return Response("Authorized:", status=status.HTTP_200_OK)
    
class SearchView(APIView): ## filters based on post title
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        
        ''' Does the filtering logic '''
        queryset = SearchService.filtered_search(request)
        
        paginator = CustomLimitOffsetPagination() # del opp så paginator ikke blir knyttet til her
        paginated_results = paginator.paginate_queryset(queryset, request)
        
        serializer = PostSnippetSerializer(paginated_results, many=True)
        response = paginator.get_paginated_response(serializer.data)

        if response != None:           
            return Response(response, status=status.HTTP_200_OK)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)