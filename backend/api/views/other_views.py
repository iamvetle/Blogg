from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

class HealthCheck(APIView):
    ''' Returns a simple 200 OK, to signal that the endpoint is online '''

    def get(self, request):
        return Response(status=status.HTTP_200_OK)