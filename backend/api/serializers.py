from .models import CustomUser, Post, Comment

from rest_framework import serializers

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        
        fields = ["__all__"]
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'age', 'address', 'phone_number', 'nickname')
        extra_kwargs = {
            'password': {'write_only': True, 'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True},
            }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user
class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer()   
    class Meta:        
        model = Post
        
        fields = ["id", "title", "content", "author"]        

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        
        fields = ["username", "first_name", "last_name", "posts"]


