from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import get_user_model
from users.services.auth_services import LoginService
from users.serializers.user_serializers import NormalUserSerializer
from rest_framework.permissions import AllowAny

CustomUser = get_user_model()

### AUTHENTICATION HANDELING

class LoginView(APIView):  # Login
    
    # ! Obviously
    permission_classes = [AllowAny] # Does NOT have to authenticated

    
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


class RegisterUserView(APIView):  # Register
    
    # ! obviously
    permission_classes = [AllowAny] # Does NOT have to authenticated

    def post(self, request):
        serializer = NormalUserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({ "message":"New account created"}, status=status.HTTP_201_CREATED
            )

        else:
            return Response({"error": "Failed to create a new account"}, status=status.HTTP_400_BAD_REQUEST)