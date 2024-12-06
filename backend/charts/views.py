from django.shortcuts import render
from .models import Chart
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import ChartModelSerializer
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from .task import process_uploaded_file
import os
from celery.result import AsyncResult


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
            'min_x':request.data.get('min_x'),
            'min_y':request.data.get('min_y'),
            'max_x':request.data.get('max_x'),
            'max_y':request.data.get('max_y'),
            'keys':request.data.get('data')
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
        
    def get(self, request, chart_id):
        chart_instance = self.get_object(chart_id, request.user.id)
        serializer = ChartModelSerializer(chart_instance)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK)
    
    def patch(self, request, chart_id):
        chart_instance = self.get_object(chart_id, request.user.id)
        serializer = ChartModelSerializer(chart_instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                {"res":"wrong parametres!"},
                status=status.HTTP_400_BAD_REQUEST
            )

    def delete(self, request, chart_id):
        chart_instance = self.get_object(chart_id, request.user.id)
        if not chart_instance:
            return Response(
                {"res":"Object with chart id does not exists!"},
                status=status.HTTP_400_BAD_REQUEST
            )
        chart_instance.delete()
        return Response(status=status.HTTP_200_OK)
    
class file_upload(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        file = request.FILES.get('file')
        if not file:
            return JsonResponse({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

        upload_dir = os.path.join(settings.MEDIA_ROOT, 'uploads')
        os.makedirs(upload_dir, exist_ok=True)
        file_path = os.path.join(upload_dir, file.name)

        with open(file_path, 'wb') as f:
            for chunk in file.chunks():
                f.write(chunk)

        task = process_uploaded_file.delay(file_path, request.user.id)
        return JsonResponse({"task_id": task.id, "status": "processing"})

class task_status(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, task_id):
        result = AsyncResult(task_id)

        if result.state == "SUCCESS":
            return JsonResponse({"status": "completed", "result": result.result})
        elif result.state == "FAILURE":
            return JsonResponse({"status": "failed", "error": str(result.result)})
        else:
            return JsonResponse({"status": result.state})
        