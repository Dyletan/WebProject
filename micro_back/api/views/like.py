from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.models import Like, Post
from django.shortcuts import get_object_or_404


@api_view(['POST', 'GET', 'DELETE'])
def like(request, user_id, post_id):
    try:
        if request.method == 'POST':
            like, created = Like.objects.get_or_create(user_id=user_id, post_id=post_id)
            if created:
                return Response({'message': 'Post liked successfully'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'Post is already liked'}, status=status.HTTP_200_OK)

        elif request.method == 'GET':
            like_id = Like.objects.filter(user_id=user_id, post_id=post_id).values_list('id', flat=True).first()
            return Response({'like_id': like_id}, status=status.HTTP_200_OK)

        elif request.method == 'DELETE':
            like = get_object_or_404(Like, user_id=user_id, post_id=post_id)
            like.delete()
            return Response({'message': 'Post unliked successfully'}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
