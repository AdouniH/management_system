
from django.db import models


class Ip_address(models.Model):
    ip = models.CharField(max_length=30)
    visited_at = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return self.ip
