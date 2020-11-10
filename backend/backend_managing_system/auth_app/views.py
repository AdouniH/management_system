from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from auth_app.models import Account
from rest_framework.authtoken.models import Token
from drf_yasg.utils import swagger_auto_schema
from auth_app.doc import token_from_code, code_from_token



class CodeValidator(APIView):

    def get(self, request, format=None):
        return Response({"token": "token.key"})

    @token_from_code
    def post(self, request, format=None):
        code = request.data["code"]
        user = Account.objects.get(code=code).user
        token, created = Token.objects.get_or_create(user=user)

        return Response({
            "token": token.key,
            "userdata":{
                "username": user.username,
                "email": user.email
            }
        })

class TokenView(APIView):

    @code_from_token
    def post(self, request, format=None):

        token = request.data["token"]
        user = Token.objects.get(key=token).user
        account = user.account

        return Response({
            "code": account.code,
            "userdata":{
                "username": user.username,
                "email": user.email
            }
        })
