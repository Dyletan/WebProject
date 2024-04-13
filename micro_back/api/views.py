from django.shortcuts import render
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse

from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import *

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)

    if user is None:
        return Response({'error': 'Invalid Credentials'}, status=400)

    token, created = Token.objects.get_or_create(user=user)
    return Response({'token': token.key})


@csrf_exempt
def register(request):
    if request.method == 'POST':
        # username = request.POST['username']
        # password = request.POST['password']
        username = request.data.get('user')
        password = request.data.get('password')
        if User.objects.filter(username=username).exists():
            return JsonResponse({'status': 'error', 'message': 'Username already exists.'})
        user = User.objects.create_user(username=username, password=password)
        user.save()
        return JsonResponse({'status': 'success', 'message': 'User created successfully.'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})


# FBV
@api_view(['GET'])
def post_list(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def post_detail(request, pk):
    post = Post.objects.get(id=pk)
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)

# CBV
from rest_framework.views import APIView

class Post(APIView):
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

class PostDetail(APIView):
    def get(self, request, pk):
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(post, many=False)
        return Response(serializer.data)
