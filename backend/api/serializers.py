from django.contrib.auth.models import Group, User
from rest_framework import serializers

class UserSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=50, min_length=6)
    username = serializers.CharField(max_length=50, min_length=6)
    password = serializers.CharField(max_length=150, write_only=True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']

    def validate(self, args):
        email = args.get('email', None)
        username = args.get('username', None)
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email":"email already exists"})
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({"username":"username already exists"})
        return super().validate(args)
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)



        