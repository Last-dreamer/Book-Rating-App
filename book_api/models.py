# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.


class Book(models.Model):
    title = models.CharField(max_length=200, null=True)
    description = models.TextField(max_length=3600, null=True)

    def total_no_rating(self):
        rating = Rating.objects.filter(book=self)
        return len(rating)
    
    def avg_no_rating(self):
        sum = 0
        rating = Rating.objects.filter(book=self)
        for i in rating:
            sum += i.stars
            if len(rating) > 0:
                return sum/len(rating)
            else:
                return 0


class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    stars = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])

    def __str__(self):
        return self.stars

    class Meta:
        unique_together = (('user', 'book'),)
        index_together = (('user', 'book'),)

