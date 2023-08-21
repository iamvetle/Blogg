from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, ProfileSerializer, PostSerializer, CommentSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import Post, Comment
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated

CustomUser = get_user_model()


### USER HANDLING

class MyAccountView(APIView): # Personal account
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class LoginView(APIView): # Login to account
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        
        if user:
            token, _ = Token.objects.get_or_create(user=user) # Get or create a token
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

class RegisterUserView(APIView): # Not in use
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            UserSerializer.create(serializer.data)
            return Response("User creation succeded", serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response("User creation failed", status=status.HTTP_400_BAD_REQUEST)

    
class UserProfileView(APIView): # Other user profiles
    
    def get(self, request, id):
        if request.user.is_authenticated:
            try:
                user = CustomUser.objects.get(pk=id)
            except CustomUser.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            
            serializer = ProfileSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    
### POST RETRIEVEL

class AllPostsView(APIView): # Retrieves ALL posts
    
    def get(self, request):
        queryset = Post.objects.all()
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SinglePostView(APIView): # Retrieves a specific post
    def get(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
class NewPostView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)



# if is authentication

# def get userinformation

# def get another user



# class MyUserView(APIView):
    
# class AllPosts(APIView):
#     # if is authenticated
    
#     # def get - retrieves all posts ? - cant get all posts

# class NewPost(APIView):
#     # if is authenticated
    
#     # def post - new post
    
    
# class SeePost(APIView):
#     # if is authenticated
    
#     # see a specific post information
    
# class CustomUser(APIView)

#     different user information


