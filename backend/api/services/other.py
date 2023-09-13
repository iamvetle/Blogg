from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CustomPageNumberPagination(PageNumberPagination):
    page_size = 10  # Default page size
    
    def get_paginated_response(self, data):
        current_page = self.page.number  # Get current page number
        
        return {
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'current_page': current_page,  # Include current page
            'results': data
        }
