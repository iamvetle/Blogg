from django.contrib import admin
from .models import CustomUser, Post, Comment, Tag, Category
from django.contrib.auth.admin import UserAdmin


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


# Forms ? ->

    
# Register ->

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    save_on_top = True

    model = Tag
        
    list_display = (
        "id",
        "name",
    )
    
    list_filter = (
        "name",
    )
    
    list_editable = (
        "name",
    )
    
    search_fields = (
        "name",
    )
    
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    save_on_top = True
    
    model = Category
    
    list_display = (
        "id",
        "name",
    )
    
    list_filter = (
        "name",
    )
    
    list_editable = (
        "name",
    )
    
    search_fields = (
        "name",
    )
    
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    
    save_on_top = True
    
    model = Post
    
    inlines = [CommentInline]
    
    list_display = (
        "id",
        "title",
        "content",
        "date_published",
        "published",
    )
    
    list_filter = (
        "published",
        "date_published",
    )
    list_editable = (
        "title",
        "content",
        "published"
    )
    
    search_fields = (
        "title",
        "content",
    )
    
    date_hierarchy = "last_modified"
    
admin.site.register(Comment)

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
        
    model = CustomUser
        
    list_display = (
        "username",
        "email",
        "first_name",
        "last_name",
    )
    
    list_filter = (
        "is_active",
    )
    
    search_fields = (
        "username",
        "email",
        "phone_number"
    )
    
    fieldsets = (
        ('Basic info', {
            'fields': ('username', 'first_name', 'last_name')}),
        ('Personal Information', {'fields': ('email', 'age', 'address', 'phone_number', 'nickname')})
    )

# https://realpython.com/python-django-blog/
# ^step 2 talks about admin class models