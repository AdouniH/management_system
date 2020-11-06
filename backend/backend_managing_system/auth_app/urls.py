from django.urls import path
from auth_app.views import CodeValidator


urlpatterns = [
    path('', CodeValidator.as_view(), name="code_validator")
]
