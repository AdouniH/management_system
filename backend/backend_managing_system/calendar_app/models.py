from django.db import models


class Calendar(models.Model):
    booked = models.BooleanField(default=False)
    is_free = models.BooleanField(default=True)
    creneau = models.DateTimeField()


class TeamLink(models.Model):
    booked = models.BooleanField(default=False)
    is_free = models.BooleanField(default=True)
    link = models.CharField(max_length=5000)
