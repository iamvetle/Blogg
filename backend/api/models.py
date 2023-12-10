from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils import timezone


class CustomUserManager(BaseUserManager):
    def create_user(
        self, email, username, password, first_name, last_name, gender, **extra_fields
    ):
        if not email:
            raise ValueError("The Email field must be set")
        if not username:
            raise ValueError("The Username field must be set")
        if not password:
            raise ValueError("The Password field must be set")
        if not first_name:
            raise ValueError("The First name field must be set")
        if not last_name:
            raise ValueError("The Last name field must be set")
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            username=username,
            first_name=first_name,
            last_name=last_name,
            gender=gender,
            **extra_fields,
        )
        user.set_password(password)

        user.save(using=self._db)
        return user

    def create_superuser(
        self, email, username, password, first_name, last_name, **extra_fields
    ):
        user = self.create_user(
            email,
            username,
            password,
            first_name,
            last_name,
            is_superuser=True,
            is_staff=True,
            **extra_fields,
        )

        return user

    # DateField: Only stores the date (Year, Month, Day).
    # DateTimeField: Stores both date and time.

    # auto_now: Automatically update the field to now every time the object is saved.
    # auto_now_add: Automatically set the field to now when the object is first created.


# In Django, you cannot use auto_now or auto_now_add with default. These options are mutually exclusive.


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(unique=True, max_length=50, blank=False)  # Required
    email = models.EmailField(unique=True, max_length=320, blank=False)  # Required
    phone_number = models.CharField(max_length=20, blank=True)

    first_name = models.CharField(max_length=50, blank=False)  # Required
    last_name = models.CharField(max_length=50, blank=False)  # Required

    CHOICES = (("Male", "Male"), ("Female", "Female"), ("Other", "Other"))

    gender = models.CharField(
        max_length=10, blank=True, default="", choices=CHOICES
    )  # Required

    date_of_birth = models.DateField(null=True, blank=True)

    # NOT recommended to use "null" together with TextField or CharField, better to use 'default=""'
    address = models.TextField(max_length=500, blank=True, default="")
    city = models.CharField(max_length=100, blank=True, default="")
    state = models.CharField(max_length=100, blank=True, default="")
    postal_code = models.CharField(max_length=50, blank=True, default="")
    country = models.CharField(max_length=100, blank=True, default="")

    bio = models.TextField(max_length=1200, blank=True, default="")
    profile_picture = models.ImageField(
        upload_to="profile_pics/", blank=True, null=True
    )

    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(default=True)

    is_staff = models.BooleanField(default=False)

    # Includes "following"
    followers = models.ManyToManyField(
        "self", related_name="following", symmetrical=False, blank=True, default=0
    )

    objects = CustomUserManager()

    USERNAME_FIELD = "username"

    # I have so few here so that I can easily create a user from the terminal if I so wanted to
    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
        "email",
    ]

    def __str__(self):
        return self.username

    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def birth(self):
        return self.date_of_birth

    def phone(self):
        return self.phone_number

    def zipcode(self):
        return self.postal_code

    """
    followers: A ManyToManyField with 'self' allows users to follow each other.

    related_name='following' allows you to access the users that a user is following.
    symmetrical=False ensures the relationship isn't automatically two-way (i.e., if User A follows User B, it doesn't mean User B follows User A).
    blank=True allows for a user to have zero followers or following."""


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Post(models.Model):
    title = models.CharField(max_length=100)  # 100 characters
    content = models.TextField(max_length=80000)  # 80,000 characters
    date_published = models.DateTimeField(
        auto_now_add=True
    )  # this is not working correctly. it is not appearing when I check on 'publish

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="posts"
    )

    categories = models.ManyToManyField(Category, blank=True)
    tags = models.ManyToManyField(Tag, related_name="posts", blank=True)

    def __str__(self):
        return self.title

    def published(self):
        return self.date_published

    def body(self):
        return self.content


class PostImage(models.Model):
    post = models.ForeignKey(Post, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="post_images/")

    def __str__(self):
        return f"Image for post {self.post}"


class PostVideo(models.Model):
    post = models.ForeignKey(Post, related_name="videos", on_delete=models.CASCADE)
    video = models.FileField(upload_to="post_videos/")

    def __str__(self):
        return f"Video for post {self.post}"


class Comment(models.Model):
    """Each post can have comments, and each post comment is this model"""

    content = models.TextField(max_length=1000)
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="comments"
    )
    date_published = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.id

    def body(self):
        return self.content

    def full_comment(self):
        return (
            f"The post: '{self.post.title}' has a comment by '{self.author.username}'"
        )


class SavedPost(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="saved_posts", on_delete=models.CASCADE
    )
    post = models.ForeignKey("Post", related_name="saved_by", on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["user", "post"], name="unique_user_post")
        ]

    def __str__(self):
        return self.post.title
