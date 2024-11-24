from django.shortcuts import render
from .models import Chart
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import ChartModelSerializer
from django.http import JsonResponse
from django.contrib.auth.models import User

class charts_list(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = User.objects.get(id=request.user.id)
        charts = Chart.objects.filter(user=user)
        serializer = ChartModelSerializer(charts, many=True)
        return JsonResponse(serializer.data, safe=False)
    
