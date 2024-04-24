from rest_framework import serializers
from .models import Post, Comment, Category, Like

class PostSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'content', 'category', 'user', 'username', 'created_at', 'likes_count']

    def get_likes_count(self, obj):
        return Like.objects.filter(post=obj).count()

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

class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)
    # Add more fields as needed

    def create(self, validated_data):
        return Category.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        # Update more fields as needed
        instance.save()
        return instance

class LikeSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    post = serializers.PrimaryKeyRelatedField(read_only=True)
    username = serializers.SerializerMethodField()

    def get_username(self, obj):
        return obj.user.username

    def create(self, validated_data):
        return Like.objects.create(**validated_data)

    def update(self, instance, validated_data):
        # Assuming you don't want to update username
        instance.user = validated_data.get('user', instance.user)
        instance.post = validated_data.get('post', instance.post)
        instance.save()
        return instance

