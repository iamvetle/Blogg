# Standard libraries
from django.contrib.auth import get_user_model
from rest_framework import serializers
from api.serializers.post_serializers import PostSnippetSerializer
from api.models import Post

# Third-party libraries

# Local application imports
from api.serializers.post_serializers import SavedPostSerializer

CustomUser = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    posts = serializers.SerializerMethodField()
    num_of_followers = serializers.SerializerMethodField()

    def get_posts(self, obj):
        posts = Post.objects.filter(author__username=obj.username)
        return PostSnippetSerializer(posts, many=True).data

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

        fields = ["num_of_followers", "username", "first_name", "last_name", "posts"]


class UserSerializer(serializers.ModelSerializer):
    followers = serializers.SerializerMethodField()
    num_of_followers = serializers.SerializerMethodField()

    saved_posts = serializers.SerializerMethodField()
    num_of_saved_posts = serializers.SerializerMethodField()

    def get_saved_posts(self, obj):
        saved_posts = obj.saved_posts.all()
        serializer = SavedPostSerializer(saved_posts, many=True)
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
        ''' Returns all followers objects '''
        followers = obj.followers.all()
        serializer = FollowersSerializer(followers, many=True)

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
            "followers",
            "num_of_followers",
            "saved_posts",
            "num_of_saved_posts",
        )
        extra_kwargs = {
            "first_name": {"required": True},
            "last_name": {"required": True},
            "email": {"required": True},
            "username": {"required": True},
        }


class FollowersSerializer(serializers.ModelSerializer):
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
