from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from api.serializers.post_serializers import CategorySerializer
from rest_framework import status
from api.models import Category
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from api.pagination import CustomLimitOffsetPagination as GenericPagination
from rest_framework.generics import ListCreateAPIView
from rest_framework import serializers


class AllCategoriesView(ListCreateAPIView):
    """Returns all categories"""
    # ? can create a new one?
    # TODO - remove later afte MAYBE adding a lot

    permission_classes = [IsAuthenticated] # NEED to be authenticated
    serializer_class = CategorySerializer
    pagination_class = None

    queryset = Category.objects.all()

    http_method_names = ["get", "post"]

    def create(self, request, *args, **kwargs):
        """Sends a 'category already exists' error"""
        try:
            return super().create(request, *args, **kwargs)
        except serializers.ValidationError:
            return Response(
                {"error": "category already exists"}, status=status.HTTP_400_BAD_REQUEST
            )
