from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password, first_name, last_name):
        user = self.model(
            username=username,
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, first_name, last_name):
        user = self.create_user((username, email, password, first_name, last_name)) # Calls the function/method above
        user.is_admin=True
        user.is_staff=True
        user.is_superuser=True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = CustomUserManager

    USERNAME_FIELD = "username"

    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
        "email",
    ]

    def __str__(self):
        return self.username
    
    def full_name(self):
        f'{self.first_name} + {self.last_name}'

    def short_name(self):
        return self.first_name
    
    def e_mail(self):
        return self.email

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    date_published = models.DateField(auto_created=True)
    last_modified = models.DateTimeField(auto_now=True)
    author = models.one_to_one_field(CustomUser)


class Comments(models.Model):

    







# CustomUser

# username
# lastname
# email
# password
# birthday

# followers
# follows

# posts ->

###

# a post

# title
# content
# published_date
# last modified
# author
# tags