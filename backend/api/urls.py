from django.urls import path, include
from .views import *
from rest_framework import routers


router = routers.DefaultRouter()
#router.register(r'users', userLoginView)


urlpatterns = [
    path('', include(router.urls)),
    path('token/', CookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
]