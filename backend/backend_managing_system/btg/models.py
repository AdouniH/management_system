from django.db import models

class Register(models.Model):
    ntf = models.IntegerField(unique=True)
    serie = models.CharField(max_length=3000, blank=True, null=True)
    lp = models.CharField(max_length=3000, blank=True, null=True)
    plle = models.CharField(max_length=3000, blank=True, null=True)
    brne = models.CharField(max_length=3000, blank=True, null=True)
    obs = models.CharField(max_length=3000, blank=True, null=True)

    def __str__(self):
        return str(self.ntf)
