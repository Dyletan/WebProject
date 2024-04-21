from rest_framework import serializers
from .models import Post, Comment, Category

class PostSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'
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
