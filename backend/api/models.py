from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings

# model.Manager - is what allows me to still use the "foundational" django manager methods

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password, first_name, last_name, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not username:
            raise ValueError('The Username field must be set')
        if not password:
            raise ValueError('The Password field must be set')
        if not first_name:
            raise ValueError('The First name field must be set')
        if not last_name:
            raise ValueError('The Last name field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)

        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, username, password, first_name, last_name, **extra_fields):
        user = self.create_user(email, username, password, first_name, last_name, is_superuser = True, is_staff = True, **extra_fields)
        
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin): # Might want to change what is required later
    username = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True, max_length=100)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    age = models.PositiveIntegerField(blank=True)
    address = models.TextField(blank=True)
    last_online = models.DateTimeField(auto_now=True, null=True)
    phone_number = models.CharField(max_length=15, null=True)
    nickname = models.CharField(max_length=30, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "username"

    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
        "email",
    ]

    def __str__(self):
        return self.username
    
    def full_name(self):
        return f'{self.first_name} {self.last_name}'

    def short_name(self):
        return self.first_name

class Post(models.Model):
     title = models.CharField(max_length=100)
     content = models.TextField()
     date_published = models.DateField(auto_now_add=True)
     last_modified = models.DateTimeField(auto_now=True)
     author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
     
     def __str__(self):
         return self.title


class Comment(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField(max_length=500)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="comments")
    date_published = models.DateField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'{self.title} (Post: {self.post})' 
    
    def full_comment(self):
        return f'{self.title}\n{self.content}'


    

# User
    #
# Profile (for addtional information) MAYBE LATER
    # Profile picture
    # Bio
    # followers / friends
    # follows / friends
# Post
    # Title
    # Content
    # date_published
    # last_modified
    # author
# Comments
    # Post
    # Content
    # Author
# Categories MAYBE LATER
    # ?





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