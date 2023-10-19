from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from api.serializers.post_serializers import CategorySerializer
from rest_framework import status
from api.models import Category
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from api.pagination import CustomLimitOffsetPagination as GenericPagination
from rest_framework.generics import ListCreateAPIView
from rest_framework import serializers

# class AllCategoriesView(APIView):
#     ''' Returns all categories '''
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         queryset = Category.objects.all()

#         serializer = CategorySerializer(queryset, many=True)

#         if serializer.is_valid:
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         else:
#             return Response(status=status.HTTP_400_BAD_REQUEST)


class AllCategoriesView(ListCreateAPIView):
    """Returns all categories"""

    permission_classes = [IsAuthenticated]
    serializer_class = CategorySerializer
    pagination_class = GenericPagination  # will probably remove this later

    queryset = Category.objects.all()

    http_method_names = ["get", "post"]

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except serializers.ValidationError:
            return Response(
                {"error": "category already exists"}, status=status.HTTP_400_BAD_REQUEST
            )
