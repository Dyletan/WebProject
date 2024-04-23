from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def user_detail(request, pk):
    try:
        user = User.objects.get(id = pk)
    except User.DoesNotExist as e:
        return Response({"Error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    if request.method == "GET":
        return Response({"id": user.id, "username": user.username}, status=status.HTTP_200_OK)
