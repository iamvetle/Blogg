from django.contrib import admin
from api.models import Post, Comment, Tag, SavedPost, PostVideo, PostImage
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html
from django.contrib.auth import get_user_model
from users.models import CustomUser


# Inlines -> (is put inside the admin models)
class CommentInline(admin.TabularInline):
    model = Comment
    fields = ["content", "post", "author", "date_published"]
    readonly_fields = ["date_published", "post"]
    extra = 0  # or else, the three extra default fields are shown - annoying
    can_delete = False
    show_change_link = True

    def has_change_permission(self, request, obj=None):
        """
        Only allow changing comments if obj is None (which means it's a new comment)
        """
        if obj is None:
            return True
        return False


class PostInline(admin.TabularInline):
    model = Post
    fields = ["title", "content", "date_published"]
    readonly_field = "date_published"
    extra = 0
    can_delete = False
    show_change_link = True

    def has_change_permission(self, request, obj=None):
        """
        Only allow changing comments if obj is None (which means it's a new comment)
        """
        if obj is None:
            return True
        return False


class SavedPostInline(admin.TabularInline):
    model = SavedPost
    fields = ["post", "user", "saved_at"]
    readonly_fields = ["saved_at"]
    extra = 0  # or else, the three extra default fields are shown - annoying
    can_delete = True
    show_change_link = True

    def has_change_permission(self, request, obj=None):
        """
        Only allow saving a new post if obj is None (which means it's a new a editing a book? - post?- already saved)
        """
        if obj is None:
            return True
        return False


# Admin models


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    model = Tag

    list_display = ("name",)

    search_fields = ("name",)

    readonly_field = "name"

class PostVideoInline(admin.TabularInline):
    model = PostVideo
    extra = 1
    
class PostImageInline(admin.TabularInline):
    model = PostImage
    extra = 1

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    save_on_top = True
    model = Post
    inlines = [CommentInline, PostVideoInline, PostImageInline]

    def list_tags(self, obj):
        """Turns each object/tag into a string, that are concatenated into one long string"""
        list_of_tags = []

        for tag in obj.tags.all():
            tag = tag.name

            list_of_tags.append(tag)

        string_of_tags = ", ".join(list_of_tags)
        return string_of_tags

    list_tags.short_description = "Tags"

    filter_horizontal = (
        "tags",
    )

    def body(self, obj):
        return format_html(obj.content)

    list_display = (
        "title",
        "id",
        "date_published",
        "list_tags",
        "author"
    )

    list_filter = ("date_published",)
    list_editable = ()

    search_fields = (
        "title",
        "content",
    )

    readonly_fields = ("id", "date_published", "body")


    fieldsets = (
        (None, {"fields": ("id", "title", "body", "content", "author")}),
        ("Additional", {"fields": ("tags",)}),
        ("Extra", {"fields": ("date_published",)}),
    )

    add_fieldsets = (
        (None, {"classes": ("wide"), "fields": ("title", "content", "author")}),
        ("Additional", {"fields": ("tags",)}),
    )


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    save_on_top = True

    model = Comment

    list_display = ("post", "author")

    search_fields = (
        "post__title",
        "author__username",
    )

    readonly_fields = ("id", "date_published", "post")

    fieldsets = (
        (None, {"fields": ("id", "content", "post")}),
        (
            "Other",
            {"fields": ("date_published",)},
        ),
    )

    date_hierarchy = "date_published"


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    def name(self, obj):
        full_name = f"{obj.first_name} {obj.last_name}"
        return full_name

    model = CustomUser
    inlines = [SavedPostInline]

    list_display = (
        "username",
        "name",
        "email",
    )

    list_filter = ("is_active",)

    search_fields = ("username", "email", "phone_number")
    
    readonly_fields = ("date_joined", "last_login")

    fieldsets = (
        (None, {"fields": ("username", "email", "first_name", "last_name")}),
        (
            "Personal Information",
            {"fields": ("gender", "date_of_birth", "address", "phone_number", "bio", "profile_picture", "followers", "last_login", "date_joined")},
        ),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "email",
                    "first_name",
                    "last_name",
                    "password1",
                    "password2",
                ),
            },
        ),
        (
            "Additional information",
            {"fields": ("gender", "date_of_birth", "address", "phone_number", "bio", "profile_picture")},
        ),
    )


# https://realpython.com/python-django-blog/
# ^step 2 talks about admin class models
