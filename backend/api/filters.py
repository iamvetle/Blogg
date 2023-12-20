from django_filters import rest_framework as filters
from api.models import Post, Tag
from django_filters import DateFromToRangeFilter
from django.db.models import Q 

class CustomPostFilter(filters.FilterSet):
    # This makes sure that I can choose MULTIPLE tags in an OR way, instead of using AND, so that all the posts 
    # (so that each post has to have all the tags (which i dont want)) 
    tags = filters.ModelMultipleChoiceFilter(
        field_name='tags__name',  # Specifies that we're filtering based on the tag name
        to_field_name='name',     # Specifies the field on the Tag model to filter against
        queryset=Tag.objects.all(),  # Queryset of tags to choose from
        conjoined=False  # If False, it will return posts that match any of the tags; if True, 
        # it will return posts that match all tags
    )

    date_published = DateFromToRangeFilter(field_name='date_published')

    class Meta:
        model = Post
        fields = []
