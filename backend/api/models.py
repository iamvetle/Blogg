from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password):
        pass
    
    def create_superuser(self, username, email, password):
        pass

class CustomUser(AbstractBaseUser):
    username = models.TextField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    password = models.

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    date_published = models.DateField(auto_created=True)
    last_modified = models.DateTimeField(auto_now=True)
    pass
    #pictures?

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