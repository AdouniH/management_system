from django.db import models
from datetime import datetime


class Calendar(models.Model):
    booked = models.BooleanField(default=False)
    is_free = models.BooleanField(default=True)
    creneau = models.DateTimeField()


class TeamLink(models.Model):
    booked = models.BooleanField(default=False)
    is_free = models.BooleanField(default=True)
    link = models.CharField(max_length=5000, unique=True)

    def __str__(self):
        return self.link

class SkypeLink(models.Model):
    booked = models.BooleanField(default=False)
    is_free = models.BooleanField(default=True)
    link = models.CharField(max_length=5000, unique=True)

    def __str__(self):
        return self.link


class Rdv(models.Model):
    name = models.CharField(max_length=5000, blank=True, null=True)
    email = models.EmailField(max_length=5000, blank=True, null=True)
    duree = models.CharField(max_length=5000, blank=True, null=True)
    tool = models.CharField(max_length=5000, blank=True, null=True)
    link = models.CharField(max_length=50000, blank=True, null=True)
    crenau = models.ForeignKey(
        Calendar,
        on_delete=models.CASCADE,
    )
    comment = models.CharField(max_length=5000, null=True, blank=True)
    picked_at = models.DateTimeField(default=datetime.now())

    def __str__(self):
        return '{} - {}'.format(self.name, self.duree)
