from django.contrib.auth.models import Group, User
from rest_framework import serializers

class UserLoginSerializer(serializers.HyperlinkedModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = User
        fields = ['email', 'password']



        