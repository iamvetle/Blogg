from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings

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
        user = self.model(
            email=email, 
            username=username,
            first_name=first_name,
            last_name=last_name,  
            **extra_fields)
        user.set_password(password)

        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, username, password, first_name, last_name, **extra_fields):
        user = self.create_user(email, username, password, first_name, last_name, is_superuser = True, is_staff = True, **extra_fields)
        
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=15, unique=True, blank=False) # Required
    email = models.EmailField(unique=True, max_length=100, blank=False) # Required
    first_name = models.CharField(max_length=30, blank=False) # Required
    last_name = models.CharField(max_length=30, blank=False) # Required
    age = models.PositiveIntegerField(blank=True)
    address = models.TextField(blank=True, default='')
    last_online = models.DateTimeField(auto_now=True)
    phone_number = models.CharField(max_length=20, blank=True, default='')
    nickname = models.CharField(max_length=30, blank=True, default='')
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


    

# Categories - kanskje senere
    # ?
# CustomUser
# Birthday

# followers
# follows

# posts ->
# tags