# Standard libraries
from django.contrib.auth import get_user_model
from django.core.validators import validate_email
from datetime import datetime
from django.core.exceptions import ValidationError

# Django Rest Framework
from rest_framework import serializers

# From the API app
from api.serializers.post_serializers import PostSaveStyleSerializer

CustomUser = get_user_model()


class LoggedInUserSerializer(serializers.ModelSerializer):
    followers = serializers.SerializerMethodField()
    num_of_followers = serializers.SerializerMethodField()

    saved_posts = serializers.SerializerMethodField()
    num_of_saved_posts = serializers.SerializerMethodField()

    following = serializers.SerializerMethodField()
    num_of_following = serializers.SerializerMethodField()

    num_of_posts_published = serializers.SerializerMethodField()

    date_joined = serializers.SerializerMethodField()

    def get_date_joined(self, obj):
        return obj.date_joined.strftime("%d-%m-%Y")

    def get_saved_posts(self, obj):
        saved_posts = obj.saved_posts.all()
        serializer = PostSaveStyleSerializer(saved_posts, many=True)
        if serializer.is_valid:
            return serializer.data
        else:
            return 0

    def get_num_of_saved_posts(self, obj):
        """Calculates and returns the total number of saved posts the object has"""
        num_of_saved_posts = 0

        saved_posts = obj.saved_posts.all()
        saved_posts_list = list(saved_posts)
        num_of_saved_posts = len(saved_posts_list)

        if num_of_saved_posts is not None:
            return num_of_saved_posts
        else:
            return num_of_saved_posts

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

    def get_num_of_posts_published(self, obj):
        """Returns a number - the amount of posts the user has published"""
        num_of_posts_published = 0

        try:
            all_posts_published_by_the_loggedIn_user = list(obj.posts.all())

            num_of_posts_published = len(all_posts_published_by_the_loggedIn_user)

            return num_of_posts_published

        except:
            return num_of_posts_published

    class Meta:
        model = CustomUser

        fields = (
            "id",  # do I HAVE TO include this?
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
            "num_of_posts_published",
            "following",
            "num_of_following",
            "followers",
            "num_of_followers",
            "saved_posts",
            "num_of_saved_posts",
            "profile_picture",
        )
        
        read_only_fields = ["date_joined"]


class NormalUserSerializer(serializers.ModelSerializer):
    num_of_followers = serializers.SerializerMethodField()
    num_of_following = serializers.SerializerMethodField()

    num_of_posts_published = serializers.SerializerMethodField()

    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser

        fields = [
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
            "num_of_posts_published",
            "num_of_following",
            "num_of_followers",
            # "saved_posts",
            "profile_picture",
            "password",
            "password_confirm",
        ]
        extra_kwargs = {
            "first_name": {"required": True},
            "last_name": {"required": True},
            "email": {"required": True},
            "username": {"required": True},
            "date_of_birth": {"required": True},
            "gender": {"required": True},

            "password": {"write_only": True},
            "password_confirm": {"write_only": True},
        }
        # read_only_fields = ["date_joined", "num_of_posts_published", "num_of_following", "num_of_followers"]

    def to_internal_value(self, data):
        # data = super().to_internal_value(data)

        # date_str = data.get('date_of_birth')
        # if date_str:
        #     try:
        #         data['date_of_birth'] = datetime.strptime(date_str, '%Y-%m-%d').date()
        #     except ValueError:
        #         raise serializers.ValidationError({"date_of_birth": "Date format is incorrect. Should be YYYY-MM-DD."})

        # Turns username lowercase
        username = data.get('username')
        if username:
            data['username'] = username.lower()
        return data

    def validate(self, attrs):
        # try:
        #     validate_email(attrs['email'])
        # except ValidationError:
        #         raise serializers.ValidationError({"email": "Invalid email format."})
        if attrs["password"] != attrs["password_confirm"]:
            # The passwords did not match
            raise serializers.ValidationError(
                {"password": "Password and Confirm Password does not match."}
            )

        # NOT a built-in function
        create_user_fields = [
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
            "password_confirm",
            "date_of_birth",
            "gender",
            ]

        for field in create_user_fields:
            # Checks whether all fields are included in the
            if field not in attrs:
                serializers.ValidationError({field: "This field was not included in the request"})

        return attrs

    def create(self, validated_data):
        validated_data.pop("password_confirm")
    
        user = CustomUser.objects.create_user(**validated_data)

        user.save()
        
        return validated_data
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

    def get_num_of_posts_published(self, obj):
        """Returns a number - the amount of posts the user has published"""
        num_of_posts_published = 0

        try:
            all_posts_published_by_the_loggedIn_user = list(obj.posts.all())

            num_of_posts_published = len(all_posts_published_by_the_loggedIn_user)

            return num_of_posts_published

        except:
            return num_of_posts_published


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
