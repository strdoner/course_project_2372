from django.urls import path, include
from .views import *
from rest_framework import routers


router = routers.DefaultRouter()
# router.register(r'charts', charts_list)


urlpatterns = [
    path('', include(router.urls)),
    path('charts/', charts_list.as_view(), name='get_charts'),
    path('charts/delete/<int:chart_id>', chart_detail.as_view(), name='chart_detail'),
    path('charts/<int:chart_id>', chart_detail.as_view(), name='get_chart'),
    path('charts/upload/', file_upload.as_view(), name='file_upload'),
    path('status/<str:task_id>/', task_status.as_view(), name='task_status')



    
]