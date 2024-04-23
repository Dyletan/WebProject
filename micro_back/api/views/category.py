from ..serializers import CategorySerializer
from ..models import Category
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

class CategoriesList(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

class CategoryDetail(APIView):
    def get_object(self, pk):
        try:
            return Category.objects.get(id=pk)
        except Category.DoesNotExist as e:
            return Response({"Error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk):
        category = self.get_object(pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data)