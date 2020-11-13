from django.db import models


class Calendar(models.Model):
    booked = models.BooleanField(default=False)
    is_free = models.BooleanField(default=True)
    creneau = models.DateTimeField()


class TeamLink(models.Model):
    booked = models.BooleanField(default=False)
    is_free = models.BooleanField(default=True)
    link = models.CharField(max_length=5000)


class Rdv(models.Model):
    username = models.CharField(max_length=5000)
    email = models.EmailField(max_length=5000)
    duree = models.CharField(max_length=5000)
    tool = models.CharField(max_length=5000)
    teams_link = models.CharField(max_length=5000, null=True)
    crenau = models.OneToOneField(
        Calendar,
        on_delete=models.CASCADE,
    )
    comment = models.CharField(max_length=5000, null=True, blank=True)