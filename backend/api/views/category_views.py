from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from api.serializers.post_serializers import CategorySerializer
from rest_framework import status
from api.models import Category
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from api.services.post_services import CreatePostService, PostSnippetService
from api.services.search_services import SearchService
from rest_framework.response import Response
from api.services.pagination_services import CustomLimitOffsetPagination

class AllCategoriesView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        queryset = Category.objects.all()
        
        serializer = CategorySerializer(queryset, many=True)
        
        if serializer.is_valid:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        