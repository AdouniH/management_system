from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from auth_app.models import Account
from rest_framework.authtoken.models import Token
from drf_yasg.utils import swagger_auto_schema
from auth_app.doc import token_from_code



class CodeValidator(APIView):

    @token_from_code
    def post(self, request, format=None):
        code = request.data["code"]
        user = Account.objects.get(code=code).user
        token, created = Token.objects.get_or_create(user=user)

        return Response({"token": token.key})
