from ..serializers import CategorySerializer
from ..models import Category
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
@api_view(['GET'])
def categories_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def category_detail(request, pk):
    try:
        category = Category.objects.get(id=pk)
    except Category.DoesNotExist as e:
        return Response({"Error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    if request.method == "GET":
        serializer = CategorySerializer(category)
        return Response(serializer.data)