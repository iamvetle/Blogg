from api.models import Post
from django.db.models import Q


class SearchService:
    @staticmethod
    def filtered_search(request):
        """filters the posts with title and"""
        queryset = Post.objects.all()

        search_query = request.query_params.get("q", None)

        filtered_queryset = queryset.filter(
            Q(title__icontains=search_query)
            | Q(author__username__icontains=search_query)
        )
        if filtered_queryset is not None:
            return filtered_queryset
        else:
            return None
