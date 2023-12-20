from rest_framework.views import APIView
from users.serializers.user_serializers import (
    NormalUserSerializer,
    LoggedInUserSerializer,
)
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model
from rest_framework import parsers

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
from rest_framework.permissions import IsAuthenticated, AllowAny
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
from api.models import Post, SavedPost, Comment, PostImage, PostVideo, Tag
from users.serializers.user_serializers import NormalUserSerializer
from api.filters import CustomPostFilter

from bs4 import BeautifulSoup

from django.core.exceptions import ValidationError

from PIL import Image
from django.core.files.base import ContentFile
from io import BytesIO

CustomUser = get_user_model()

class PostCreateView(APIView):
    """Creates a post together with images"""

    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    permission_classes = [IsAuthenticated]  # NEED to be authenticated

    def post(self, request, *args, **kwargs):
        
        try:
            
            # The title of the post
            title = request.data["title"]

            # The html post content
            content = request.data["content"]

            # The tags in the request are all in one long string
            tagsString = request.data.get("tags")

            # List to hold all of the tags
            tagsList = []
            # Checks if the request has too many tags in it

            if tagsString:
                # Splits the string with all of the posts
                tagsList = tagsString.split(",")
                print("The tags in the request:", tagsList, type(tagsList)) # print to self
                
                # Checking if the request contained too many tags - it should not have more than 3
                if (len(tagsList) > 3 ):
                    print("The number of tags included in the request was/is:", len(tagsList))
                    return Response({"error": "The request had too many tags in it (max=3)"}, status=status.HTTP_400_BAD_REQUEST)

            if not title and not content:
                print("There was no 'title' AND no 'content' values") # print to self
                return Response(
                    {"error": "Both a title and content is missing"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            elif not title:
                print("There was no 'title' value") # print to self
                return Response({"error": "A title is required"})
            
            elif not content:
                print("There was no 'content' value") # print to self
                return Response({"error": "Content for the post is required"})

            post = Post.objects.create(title=title, content=content, author=request.user)

            if not post:
                print("Failed to create post. There was no 'post'.") # print to self
                return Response (
                    {"error": "Failed to create the post"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
                
            # If there are tags in the request, that are added to the post instance 
            if tagsList:
                for tagItem in tagsList:

                    # Creates a new tag object instance
                    tag = Tag.objects.get(name=tagItem)

                    # Adds that instance to the post model
                    post.tags.add(tag)

            # Going to contain all of the images
            image_map = {}

            for key, image_file in request.FILES.items():
                # Open the uploaded image using Pillow
                image = Image.open(image_file)

                # Compress and convert the image to WebP
                output = BytesIO()
                image.save(output, format="WEBP", quality=80)
                output.seek(0)

                # Create a new Django file-like object for the WebP image
                webp_file = ContentFile(
                    output.read(), name=image_file.name.split(".")[0] + ".webp"
                )

                # Create the PostImage instance with the converted WebP image
                image_instance = PostImage.objects.create(post=post, image=webp_file)
                image_map[key.split("_")[1]] = image_instance.image.url

            soup = BeautifulSoup(content, "html.parser")
            for img in soup.find_all("img"):
                # Gets the unique id referance to the image in the "data" html attribute
                data_text = img.get("data")
                if data_text in image_map:
                    relativeImageSource = image_map[data_text]
                    actualFullImageSource = f"http://localhost:8888{relativeImageSource}"
                    img["src"] = actualFullImageSource

            # Changes the html content to the new updated one
            post.content = str(soup)
            
            # Finally saves the post                            
            post.save()

            return Response(
                {"status": "Post created successfully"}, status=status.HTTP_201_CREATED
            )

        except ValidationError as e:
            print("A validation error occurred") # print to self
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Log the exception for debugging
            print("General exepction occurred") # print to self
            return Response(
                {"error": "An unexpected error occurred"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
