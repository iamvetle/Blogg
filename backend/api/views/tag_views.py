from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView
from rest_framework import status
from api.models import Tag
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

# Serializer
from api.serializers.tag_serializers import TagSerializer

class TagsAllView(ListCreateAPIView):
    """Returns all tags"""
    # ? can also create a new one
    # TODO - ^remove it later after adding a bunch
    
    permission_classes = [AllowAny] # NO need to be authenticated
    
    serializer_class = TagSerializer
    
    pagination_class = None

    queryset = Tag.objects.all()

    http_method_names = ["get", "post"]

    def create(self, request, *args, **kwargs):
        """Sends a 'tag already exists' error"""
        try:
            return super().create(request, *args, **kwargs)
        except serializers.ValidationError:
            return Response(
                {"error": "Tag already exists"}, status=status.HTTP_400_BAD_REQUEST
            )
