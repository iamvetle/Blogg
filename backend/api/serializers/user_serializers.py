from api.models import CustomUser, Post, Comment, Tag, Category, SavedPost
from django.contrib.auth import get_user_model
from rest_framework import serializers
from datetime import datetime
from time import strftime
from django.utils.safestring import mark_safe

CustomUser = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    num_of_followers = serializers.SerializerMethodField()

    def get_num_of_followers(self, obj):
        num_of_followers = 0
        print(obj)

        try:
            followers = list(obj.followers.all())

            num_of_followers = len(followers)
            return num_of_followers

        except:
            return num_of_followers

    class Meta:
        model = CustomUser

        fields = (
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "age",
            "address",
            "phone_number",
            "nickname",
            "last_online",
            "num_of_followers",
        )
        extra_kwargs = {
            "first_name": {"required": True},
            "last_name": {"required": True},
            "email": {"required": True},
            "username": {"required": True},
        }

class FollowersSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser

        fields = ["username"]

class JustLoggedInSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser

        fields = ["username, first_name, last_name"]

        extra_kwargs = {
            "username": {"read_only": True},
            "first_name": {"read_only": True},
            "last_name": {"read_only": True},
        }
    