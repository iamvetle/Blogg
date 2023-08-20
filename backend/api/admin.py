from django.contrib import admin
from .models import CustomUser, Post, Comment
from django import forms
from django.contrib.auth.admin import UserAdmin


# Customize

# Inlines ->
    
# Admin models ->


# Forms ? ->
 

    
# Register ->
    
admin.site.register(CustomUser, UserAdmin)