import uuid
from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils import timezone


class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f"{self.name}"


class Post(models.Model):
    title = models.CharField(max_length=100)  # 100 characters
    content = models.TextField(max_length=80000)  # 80,000 characters
    date_published = models.DateTimeField(
        auto_now_add=True
    )  # this is not working correctly. it is not appearing when I check on 'publish

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="posts"
    )

    tags = models.ManyToManyField(Tag, related_name="posts", blank=True)

    def __str__(self):
        return f"{self.title}"

    def published(self):
        return f"{self.date_published}"

    def body(self):
        return f"{self.content}"


class PostImage(models.Model):
    post = models.ForeignKey(Post, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="post_images/")

    def __str__(self):
        return f"Image for post {self.post}"


class PostVideo(models.Model):
    post = models.ForeignKey(Post, related_name="videos", on_delete=models.CASCADE)
    video = models.FileField(upload_to="post_videos/")

    def __str__(self):
        return f"Video for post {self.post}"


class Comment(models.Model):
    """Each post can have comments, and each post comment is this model"""

    content = models.TextField(max_length=1000)
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="comments"
    )
    date_published = models.DateField(auto_now_add=True)

    def __str__(self): 
        # Can only return as string
        return f"{self.id}"

    def body(self):
        return f"{self.content}"

    def full_comment(self):
        return (
            f"The post: '{self.post.title}' has a comment by '{self.author.username}'"
        )


class SavedPost(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="saved_posts", on_delete=models.CASCADE
    )
    post = models.ForeignKey("Post", related_name="saved_by", on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["user", "post"], name="unique_user_post")
        ]

    def __str__(self):
        return f"{self.post.title}"
