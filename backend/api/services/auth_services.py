from rest_framework.views import APIView
from api.serializers.user_serializers import NormalUserSerializer, LoggedInUserSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model

CustomUser = get_user_model()


class LoginService:  # Try login logic
    @staticmethod
    def login_user(request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(
            username=username, password=password
        )  # Tries to authenticate

        if user:
            token, _ = Token.objects.get_or_create(
                user=user
            )  # 'Get' or 'Create' a token

            info_for_store = {
                "username": username,
                "token": token.key,
            }

            return info_for_store
        else:
            return None


class NewUserService(APIView):  # Try to register a user logic
    @staticmethod
    def register_user(registration_data):
        serializer =  NormalUserSerializer(data=registration_data)

        print(registration_data)

        if serializer.is_valid():
            serializer.save()
            return registration_data
        else:
            print("Returned none?")
            return None
