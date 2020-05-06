# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User
from rest_framework.decorators import action
from .models import Book, Rating
from .serializers import BookSerializer, RatingSerializer, UserSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny, )


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny, )

    # in action decorator methods , details
    @action(detail=True, methods=['POST'])
    def rateBook(self, request, pk=None):

        # if stars are given  then it will update or create if not then it will ask us provide
        if 'stars' in request.data:
            # current book to give  him stars
            book = Book.objects.get(id=pk)
            # current user
            # user = User.objects.get(id=1)
            user = request.user
            # requesting the stars fields and it's value...
            stars = request.data['stars']
            
            try:
                # storing the a single user and a book in a rating
                rating = Rating.objects.get(user=user, book=book)
                # giving him stars
                rating.stars = stars
                # saving the stars
                rating.save()
                # to show it if any
                serialized_data = RatingSerializer(rating, many=False)
                response = {'message': 'updating the stars...',
                            'serialized data': serialized_data.data}
                return Response(response, status=status.HTTP_200_OK)
            except:
                rating = Rating.objects.create(user=user, book=book, stars=stars)
                serialized_data = RatingSerializer(rating, many=False)
                response = {'message': 'Giving  the  new stars...',
                            'serialized data': serialized_data.data}
                return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'message': 'you need to provide the stars'}
            return Response(response, status=status.HTTP_200_OK)


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = TokenAuthentication
    permission_classes = (AllowAny, )
