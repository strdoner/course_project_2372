from rest_framework import serializers
from .models import Chart


class ChartModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chart
        fields = '__all__'

    