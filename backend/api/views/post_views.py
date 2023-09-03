from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import PostSerializer, PostSnippetSerializer
from rest_framework import status
from ..models import Post
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated

CustomUser = get_user_model()

### POST RETRIEVEL

class MyPosts(APIView):
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        author = request.user.id
        queryset = Post.objects.filter(author_id=author)
        serializer = PostSerializer(queryset, many=True)
        
        if serializer.is_valid:
            return Response(serializer.data, status=status.HTTP_200_OK)

class AllPostsView(APIView): # Retrieves ALL posts
    
    def get(self, request):
        queryset = Post.objects.all()
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class PostSnippetsView(APIView):
    
    def get(self, request):
        queryset = Post.objects.all()
        serializer = PostSnippetSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SinglePostView(APIView): # Retrieves a specific post
    def get(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
class CreatePostView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
