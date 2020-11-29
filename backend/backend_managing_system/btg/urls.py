from django.urls import path
from btg.views import RegisterView, DetailView, CreationView


urlpatterns = [
    path('', RegisterView.as_view(), name="btg"),
    path('<int:ntf>/', DetailView.as_view(), name="ntf"),
    path('creation/', CreationView.as_view(), name="creation")
]
