from django.db import models
from django.contrib.auth.models import User


class Chart(models.Model):
    FORMAT_CHOICES = (
        ('float', 'Float'),
        ('integer', 'Integer')
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, null=False, blank=False)
    x_format = models.CharField(max_length=10, choices=FORMAT_CHOICES, default="float")
    y_format = models.CharField(max_length=10, choices=FORMAT_CHOICES, default="float")
    min_x = models.FloatField(default=0)
    min_y = models.FloatField(default=0)
    max_x = models.FloatField(default=10)
    max_y = models.FloatField(default=10)
    keys = models.JSONField(null=True)
    created = models.DateTimeField(auto_now_add=True)
