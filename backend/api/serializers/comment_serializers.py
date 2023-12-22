# Django Rest Framework
from rest_framework import serializers

# Models
from api.models import Comment

# Django
from django.utils.html import format_html
from django.utils.safestring import mark_safe

# Other libraries
from time import strftime


class CommentSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField()
    date_published = serializers.SerializerMethodField()
    
    author = serializers.StringRelatedField()
    
    class Meta:
        model = Comment
        fields = ["id", "post", "content", "author", "date_published"]
        
        read_only_fields = ["date_published"]        
        
    def get_content(self, obj):
        content = obj.content
        
        content = format_html(content)
        return content

    def get_date_published(self, obj):
        return obj.date_published.strftime("%d-%m-%Y")
  