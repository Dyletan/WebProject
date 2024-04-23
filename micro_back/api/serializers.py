from rest_framework import serializers
from .models import Post, Comment, Category, Like

class PostSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'content', 'category', 'user', 'username', 'created_at']

    def get_username(self, obj):
        return obj.user.username

    def update(self, instance, validated_data):
        validated_data.pop('created_at', None)
        instance.title = validated_data.get('title')
        instance.content = validated_data.get('content')
        instance.category = validated_data.get('category')

        instance.save()
        return instance


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = Like
        fields = ['id', 'user', 'post', 'username']

    def get_username(self, obj):
        return obj.user.username

