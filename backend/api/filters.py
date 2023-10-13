from django_filters import rest_framework as filters
from .models import Post
from django_filters import DateFromToRangeFilter

class PostFilter(filters.FilterSet):
    title = filters.CharFilter(field_name='title', lookup_expr='icontains')
    author = filters.CharFilter(field_name='author__username', lookup_expr='icontains')
    categories = filters.CharFilter(field_name='categories__name', lookup_expr='icontains')
    tags = filters.CharFilter(field_name='tags__name', lookup_expr='icontains')
    date_published = DateFromToRangeFilter(field_name='date_published')

    class Meta:
        model = Post
        fields = []
    