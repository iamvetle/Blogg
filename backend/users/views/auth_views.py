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
        # A service?
        response = LoginService.login_user(request)

        if response is not None:
            print(
                f"Correct credentials, logged in as {response['username']}. Token {response['token']}"
            )
            # Correct credentials
            return Response(
                response, status=status.HTTP_200_OK
            )

        else:
            print(f"Incorrect credentials")
            # Wrong credentials
            return Response(
                "Wrong credentials", status=status.HTTP_401_UNAUTHORIZED
            )


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