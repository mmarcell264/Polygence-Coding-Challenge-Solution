from .models import Spending
from .serializers import SpendingSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser

# Create your views here.

class SpendingList(APIView):
    parser_classes = [JSONParser]

    def get(self, request):
        spendings = Spending.objects.all()
        serializer = SpendingSerializer(spendings, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SpendingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
