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


class PostService:  # Try login logic
    @staticmethod
    def craft_post(request):
        """Tries to create a post. Can include:
        - Title
        - Content
        - Author (not in request)
        - Tags
        - Images
        """

        title = request.data["title"]
        content = request.data["content"]
        tagsString = request.data.get("tags")

        print(type(tagsString))
        print(tagsString)

        if not title and not content:
            return Response(
                {"error": "Both a title and content is missing"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        elif not title:
            return Response({"error": "A title is required"})
        elif not content:
            return Response({"error": "Content for the post is missing"})

        post = Post.objects.create(
            title=title, content=content, author=request.user
        )

        # List to hold all of the tags
        tagsList = []
        
        if tagsString:
        # The tags in the request are returned as one long string, so I need to split it
            tagsList = tagsString.split(",")

            print(type(tagsList))
            print(tagsList)
            for tagItem in tagsList:
                print(tagItem)
                tag = Tag.objects.get(name=tagItem)
                print(tag)
                post.tags.add(tag)

        if not post:
            return Response(
                {"error": "Failed to create the post"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

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
                actualFullImageSource = (
                    f"http://localhost:8888{relativeImageSource}"
                )
                img["src"] = actualFullImageSource

        post.content = str(soup)
        
        # returning the post after all the changes
        return post