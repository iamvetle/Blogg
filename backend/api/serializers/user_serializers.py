# Standard libraries
from django.contrib.auth import get_user_model

# Django Rest Framework
from rest_framework import serializers

# Local application imports
from api.serializers.post_serializers import PostSaveStyleSerializer

CustomUser = get_user_model()

class LoggedInUserSerializer(serializers.ModelSerializer):
    followers = serializers.SerializerMethodField()
    num_of_followers = serializers.SerializerMethodField()

    saved_posts = serializers.SerializerMethodField()
    num_of_saved_posts = serializers.SerializerMethodField()

    following = serializers.SerializerMethodField()
    num_of_following = serializers.SerializerMethodField()

    def get_saved_posts(self, obj):
        saved_posts = obj.saved_posts.all()
        serializer = PostSaveStyleSerializer(saved_posts, many=True)
        if serializer.is_valid:
            return serializer.data
        else:
            return 0

    def get_num_of_saved_posts(self, obj):
        """Calculates and returns the total number of saved posts the object has"""
        saved_posts = obj.saved_posts.all()
        saved_posts_list = list(saved_posts)
        num_of_saved_posts = len(saved_posts_list)
        if num_of_saved_posts is not None:
            return num_of_saved_posts
        else:
            return 0

    def get_followers(self, obj):
        """Returns all followers objects"""
        followers = obj.followers.all()
        serializer = FollowerSerializer(followers, many=True)

        return serializer.data

    def get_num_of_followers(self, obj):
        """Calculates the total number of follwers the object has"""
        num_of_followers = 0

        try:
            followers = list(obj.followers.all())
            num_of_followers = len(followers)
            return num_of_followers
        except:
            return num_of_followers

    def get_following(self, obj):
        """Returns all follwing objects"""

        try:
            queryset = obj.following.all()
            serializer = FollowerSerializer(queryset, many=True)
            if serializer.is_valid:
                return serializer.data
            else:
                return 0
        except:
            return 0

    def get_num_of_following(self, obj):
        """Calculates the amount the logged in user is following"""
        num_of_following = 0

        try:
            following = list(obj.following.all())

            num_of_following = len(following)
            return num_of_following

        except:
            return num_of_following

    class Meta:
        model = CustomUser

        fields = (
            "id", # do I HAVE TO include this?
            "username",
            "first_name",
            "last_name",
            "email",
            "bio",
            "date_of_birth",
            "address",
            "city",
            "state",
            "postal_code",
            "country",
            "date_joined",
            "gender",
            "phone_number",
            "following",
            "num_of_following",
            "followers",
            "num_of_followers",
            "saved_posts",
            "num_of_saved_posts",
            "profile_picture",
        )
        extra_kwargs = {
            "first_name": {"required": True},
            "last_name": {"required": True},
            "email": {"required": True},
            "username": {"required": True},
            "profile_picture": {"required": False},
            "date_joined": {"read_only": True}

        }


class NormalUserSerializer(serializers.ModelSerializer):
    num_of_followers = serializers.SerializerMethodField()
    num_of_following = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser

        fields = [
            "username",
            "first_name",
            "last_name",
            "num_of_followers",
            "num_of_following",
            "bio",
            "profile_picture",
        ]

    def get_num_of_followers(self, obj):
        """Calculates the total number of follwers the object has"""
        num_of_followers = 0

        try:
            followers = list(obj.followers.all())

            num_of_followers = len(followers)
            return num_of_followers

        except:
            return num_of_followers

    def get_num_of_following(self, obj):
        """Calculates the amount the logged in user is following"""
        num_of_following = 0

        try:
            following = list(obj.following.all())

            num_of_following = len(following)
            return num_of_following

        except:
            return num_of_following


class FollowerSerializer(serializers.ModelSerializer):
    """Returns the username of the object"""

    class Meta:
        model = CustomUser

        fields = ["username"]


class JustLoggedInSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser

        fields = ["username", "first_name", "last_name"]

        extra_kwargs = {
            "username": {"read_only": True},
            "first_name": {"read_only": True},
            "last_name": {"read_only": True},
        }
