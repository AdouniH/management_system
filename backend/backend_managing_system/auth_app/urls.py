from django.urls import path
from auth_app.views import CodeValidator, TokenView


urlpatterns = [
    path('', CodeValidator.as_view(), name="code_validator"),
    path('userdata_from_token/', TokenView.as_view(), name="token_view")
]
