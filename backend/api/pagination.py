from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CustomPageNumberPagination(PageNumberPagination):
    # * Mimick in pagination
    
    page_size = 10 # Also set as default in settings.py
    max_page_size = 50
    
    page_size_query_param = "page_size"
    last_page_strings = "last"
    
    page_query_param = "page"
    
    def get_paginated_response(self, data):

        return Response({
            "count": self.page.paginator.count,
            "next": self.get_next_link(),
            "previous": self.get_previous_link(),
            "results": data,
        })
    
