from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

class CustomLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 100

    def get_paginated_response(self, data):
        current_page = self.get_current_page()

        return Response({
            "count": self.count,
            "next": self.get_next_link(),
            "previous": self.get_previous_link(),
            "current_page": current_page,
            "results": data,
        })

    def get_current_page(self):
        limit = self.get_limit(self.request)
        offset = self.get_offset(self.request)

        if limit:
            return (offset // limit) + 1
        return 1
