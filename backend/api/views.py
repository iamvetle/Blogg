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


class MyAccountView(APIView):
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK) # AUTHORIZED - OK
    
class UserProfileView(APIView):
    
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
    

class PostView(APIView): #working
    
    def get(self, request):
        queryset = Post.objects.all()
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
            

class IndividualPostView(APIView):
     def get(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)
        

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
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


