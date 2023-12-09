from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView
from api.serializers.post_serializers import TagSerializer
from rest_framework import status
from api.models import Tag
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from api.pagination import CustomLimitOffsetPagination as GenericPagination


class AllTagsView(ListCreateAPIView):
    """Returns all tags, or can create a tag?"""
    permission_classes = [IsAuthenticated]
    serializer_class = TagSerializer
    pagination_class = None  # will probably remove this later

    queryset = Tag.objects.all()

    http_method_names = ["get", "post"]

    def create(self, request, *args, **kwargs):
        """Sends a 'tag already exists' error"""
        try:
            return super().create(request, *args, **kwargs)
        except serializers.ValidationError:
            return Response(
                {"error": "tag already exists"}, status=status.HTTP_400_BAD_REQUEST
            )
