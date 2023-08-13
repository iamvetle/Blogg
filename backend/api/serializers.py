from .models import CustomUser

from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class meta:
        model = CustomUser
        
        fields = ["username", "email", "first_name", "last_name" "password"]
        
class ProfileSerializer(serializers.ModelSerializer):
    class meta:
        model = CustomUser
        
        fields = ["username", "first_name", "last_name"]