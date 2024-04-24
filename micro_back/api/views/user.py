from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

class UserDetail(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(id=pk)
        except User.DoesNotExist as e:
            return Response({"Error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk):
        user = self.get_object(pk)
        return Response({"id": user.id, "username": user.username}, status=status.HTTP_200_OK)
