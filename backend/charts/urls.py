from django.urls import path, include
from .views import *
from rest_framework import routers


router = routers.DefaultRouter()
# router.register(r'charts', charts_list)


urlpatterns = [
    path('', include(router.urls)),
    path('charts/', charts_list.as_view(), name='get_charts'),


    
]