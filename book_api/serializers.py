from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Book, Rating
from rest_framework.authtoken.views import Token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        # to hid the password from GET method but POST it can be written .....
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    # it override the create method to create a user ...
    # when user is created it's token will automatically generate...
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user)
        return user


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'description' , 'total_no_rating', 'avg_no_rating']


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'
