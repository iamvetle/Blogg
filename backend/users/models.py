from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)


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
    
    # Required
    gender = models.CharField(
        max_length=10, blank=True, default="", choices=CHOICES
    ) 

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
        "gender",
    ]

    def __str__(self):
        return f"{self.username}"

    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def birth(self):
        return f"({self.date_of_birth}"

    def phone(self):
        return f"{self.phone_number}"

    def zipcode(self):
        return f"{self.postal_code}"
    
    @classmethod
    def instance_count(cls):
        return cls.objects.count()

    """
    followers: A ManyToManyField with 'self' allows users to follow each other.

    related_name='following' allows you to access the users that a user is following.
    symmetrical=False ensures the relationship isn't automatically two-way (i.e., if User A follows User B, it doesn't mean User B follows User A).
    blank=True allows for a user to have zero followers or following.
    
    """