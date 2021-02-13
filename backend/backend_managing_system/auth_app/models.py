from django.db import models
from django.contrib.auth.models import User

from django.conf import settings
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class Account(models.Model):
    code = models.CharField(max_length=300)
    email = models.EmailField(max_length=300, blank=True, null=True)
    name = models.CharField(max_length=300, blank=True, null=True)
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
    )
    route = models.CharField(max_length=300,
    choices=(
        ('calendar', 'calendar'),
        ('route', 'route')
)
,blank=True, null=True)

    def __str__(self):
        return self.code


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


@receiver(post_delete, sender=Account)
def delete_linked_user(sender, instance=None, **kwargs):
    if instance:
        user = instance.user
        if not user.is_superuser:
            user.delete()
