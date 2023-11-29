from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import get_user_model
from api.services.auth_services import LoginService
from api.serializers.user_serializers import NormalUserSerializer

CustomUser = get_user_model()

### AUTHENTICATION HANDELING


class LoginView(APIView):  # Login
    def post(self, request):
        info_for_store = LoginService.login_user(request)

        if info_for_store is not None:
            print(
                f"Correct credentials, logged in as {info_for_store['username']}. Token {info_for_store['token']}"
            )
            return Response(
                info_for_store, status=status.HTTP_200_OK
            )  # Correct credentials / token

        else:
            print(f"Incorrect credentials")
            return Response(
                "Wrong credentials ", status=status.HTTP_401_UNAUTHORIZED
            )  # Wrong credentials


class RegisterUserView(APIView):  # Registrer
    def post(self, request):
        serializer = NormalUserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED
            )

        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)