from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# model.Manager - is what allows me to still use the "foundational" django manager methods

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password, first_name, last_name):
        user = self.model(
            username=username,
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            )
        user.is_superuser=False
        user.is_staff=False
        user.set_password(password)
        
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, first_name, last_name):
        user = self.model(
            username=username,
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            )
        user.is_superuser=True
        user.is_staff=True
        user.set_password(password)
        
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True, max_length=30)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
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
     author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
     
     def __str__(self):
         return self.title


class Comment(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField(max_length=500)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="comments")
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