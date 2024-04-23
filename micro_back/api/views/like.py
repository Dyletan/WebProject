from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.models import Like, Post
from api.serializers import LikeSerializer


@api_view(['GET', 'POST', 'DELETE'])
def likes_list(request, pk):
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        likes_count = Like.objects.filter(post=post).count()
        return Response({'likes_count': likes_count})

    elif request.method == 'POST':
        user_id = request.data.get('user_id')
        if user_id is None:
            return Response({'error': 'User ID is required for creating a like'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            existing_like = Like.objects.get(user_id=user_id, post=post)
            return Response({'error': 'Like already exists'}, status=status.HTTP_400_BAD_REQUEST)
        except Like.DoesNotExist:
            Like.objects.create(user_id=user_id, post=post)
            return Response({'message': 'Like created successfully'}, status=status.HTTP_201_CREATED)

    elif request.method == 'DELETE':
        user_id = request.data.get('user_id')
        if user_id is None:
            return Response({'error': 'User ID is required for deleting a like'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            like_to_delete = Like.objects.get(user_id=user_id, post=post)
            like_to_delete.delete()
            return Response({'message': 'Like deleted successfully'})
        except Like.DoesNotExist:
            return Response({'error': 'Like does not exist'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def check_like(request, post_id, user_id):
    try:
        like = Like.objects.get(user_id=user_id, post_id=post_id)
        return Response({'liked': True})
    except Like.DoesNotExist:
        return Response({'liked': False})
