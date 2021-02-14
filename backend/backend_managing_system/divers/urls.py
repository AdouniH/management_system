
from django.urls import path, include
from divers.views import Ip


urlpatterns = [
    path('ip/', Ip.as_view(), name='ip'),
]
