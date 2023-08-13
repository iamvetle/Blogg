from django.contrib import admin
from .models import CustomUser, Post, Comment

# Customize

# Inlines ->
class CommentInline(admin.TabularInline):
    model = Comment
    fields = ["title", "content", "post", "author", "date_published"]
    readonly_fields = ["date_published"]
    extra = 0
    can_delete = False
    show_change_link = True
    
    def has_change_permission(self, request, obj=None):
        """
        Only allow changing comments if obj is None (which means it's a new comment)
        """
        return not obj

class PostInline(admin.TabularInline):
    model = Post
    fields = ["title", "content", "date_published", "last_modified"]
    readonly_fields = ["date_published", "last_modified"]
    extra = 0
    can_delete = False
    show_change_link = True
    def has_change_permission(self, request, obj=None):
        """
        Only allow changing comments if obj is None (which means it's a new comment)
        """
        return not obj
    
# Admin models ->
    
class CustomUserAdmin(admin.ModelAdmin):
    inlines = [PostInline]

class PostAdmin(admin.ModelAdmin):
    inlines = [CommentInline]
    
# Register ->
    
admin.site.register(CustomUser, CustomUserAdmin)

admin.site.register(Post, PostAdmin)

admin.site.register(Comment)