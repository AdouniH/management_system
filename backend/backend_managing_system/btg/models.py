from django.db import models

class Register(models.Model):
    ntf = models.IntegerField()
    serie = models.CharField(max_length=3000, blank=True, null=True)
    lp = models.IntegerField(blank=True, null=True)
    plle = models.IntegerField(blank=True, null=True)
    brne = models.IntegerField(blank=True, null=True)
    obs = models.CharField(max_length=3000, blank=True, null=True)

    def __str__(self):
        return str(self.ntf)
