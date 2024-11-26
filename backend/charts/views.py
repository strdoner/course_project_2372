from django.shortcuts import render
from .models import Chart
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import ChartModelSerializer
from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response

class charts_list(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = User.objects.get(id=request.user.id)
        charts = Chart.objects.filter(user=user)
        serializer = ChartModelSerializer(charts, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    def post(self, request):
        data = {
            'user':request.user.id,
            'title':request.data.get('title'),
            'keys':{"x":[1,2,3]}
        }
        serializer = ChartModelSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class chart_detail(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, chart_id, user_id):
        try:
            return Chart.objects.get(id=chart_id, user=user_id)
        except Chart.DoesNotExist:
            return None

    def delete(self, request, chart_id):
        chart_instance = self.get_object(chart_id, request.user.id)
        if not chart_instance:
            return Response(
                {"res":"Object with chart id does not exists!"},
                status=status.HTTP_400_BAD_REQUEST
            )
        chart_instance.delete()
        return Response(status=status.HTTP_200_OK)
        