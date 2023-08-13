from django.contrib import admin
from .models import CustomUser, Post, Comment

# Register your models here.

# Customize ->

class CommentInline(admin.TabularInline):
    model = Comment
    extra = 1
    fields = ["title", "content", "post", "author", "date_published"]
    readonly_fields = ["title", "content", "post", "author", "date_published"]

class PostAdmin(admin.ModelAdmin):
    inlines = [CommentInline]
    
# Register ->
    
admin.site.register(CustomUser)

admin.site.register(Post, PostAdmin)

admin.site.register(Comment)