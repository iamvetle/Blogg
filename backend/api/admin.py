from django.contrib import admin
from .models import CustomUser, Post, Comment, Tag, Category
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html


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
    
    model = Tag

    list_display = (
        "name",
    )

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    model = Category

    list_display = (
        "name",
    )

    search_fields = ("name",)
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    save_on_top = True

    model = Post

    inlines = [CommentInline]

    def body(self, obj):
        return format_html(obj.content)

    list_display = (
        "title",
        "date_published",
        "published",
    )

    list_filter = (
        "published",
        "date_published",
    )
    list_editable = ()

    search_fields = (
        "title",
        "content",
    )
    
    readonly_fields = ('date_published', 'date_created', 'last_modified', 'body')

    date_hierarchy = "last_modified"

    fieldsets = (
        (None, {"fields": ("title", "body", "content", "published")}),
        (
            "Other",
            {"fields": ("last_modified", "date_published")},
        ),
    )

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    model = Comment
    
    list_display = (
        "title",
        "post",
        "author"
    )
    
    readonly_fields = ('date_published', 'last_modified', 'post')
    
    fieldsets = (
        (None, {"fields": ("title", "content", "post")}),
        (
            "Other",
            {"fields": ("last_modified", "date_published")},
        ),
    )
        
    date_hierarchy = "last_modified"

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    def name(self, obj):
        full_name = f"{obj.first_name} {obj.last_name}"
        return full_name

    model = CustomUser

    list_display = (
        "username",
        "name",
        "email",
    )

    list_filter = ("is_active",)

    search_fields = ("username", "email", "phone_number")

    fieldsets = (
        ("Basic info", {"fields": ("username", "first_name", "last_name", "password")}),
        (
            "Personal Information",
            {"fields": ("email", "age", "address", "phone_number", "nickname")},
        ),
    )


# https://realpython.com/python-django-blog/
# ^step 2 talks about admin class models
