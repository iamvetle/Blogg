# Django rest framework
from rest_framework import serializers

# From models
from api.models import Tag

class TagSerializer(serializers.ModelSerializer):
    post_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Tag
        
        fields = ["id", "name", "post_count"]
        
        read_only_fields = ["post_count"]

    def get_post_count(self, obj):
        """Returns the number of posts that have this exact tag"""
        return obj.posts.count()