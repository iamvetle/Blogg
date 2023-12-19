from rest_framework.views import APIView
from users.serializers.user_serializers import NormalUserSerializer, LoggedInUserSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model

CustomUser = get_user_model()


class LoginService:  # Try login logic
    @staticmethod
    def login_user(request):
        """Takes the username and password input and tries to authenticate.
        If sucessfull, returns a new token, if one has not already been assigned.
        """
        username = request.data.get("username")
        # Turns the username lowercase - so it is possible to login even though you dont have ALL of the letters lowercase
        username = username.lower()
        password = request.data.get("password")

        # Tries to authenticate
        user = authenticate(
            username=username, password=password
        )

        # Create new token, or retrieve existing token
        if user:
            token, _ = Token.objects.get_or_create(
                user=user
            )

            response = {
                "username": username,
                "token": token.key,
            }

            return response
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
