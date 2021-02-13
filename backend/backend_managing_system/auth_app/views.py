from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from auth_app.models import Account
from rest_framework.authtoken.models import Token
from drf_yasg.utils import swagger_auto_schema
from auth_app.doc import token_from_code, code_from_token
from rest_framework import status


class CodeValidator(APIView):

    @token_from_code
    def post(self, request, format=None):
        code = request.data["code"].strip()
        user = Account.objects.get(code=code).user
        token, created = Token.objects.get_or_create(user=user)
        route = Account.objects.get(code=code).route

        return Response({
            "token": token.key,
            "userdata":{
                "username": user.username,
                "email": user.email
            },
            "route": route
        }, status=status.HTTP_200_OK)


class TokenView(APIView):

    @code_from_token
    def post(self, request, format=None):

        token = request.data["token"]
        user = Token.objects.get(key=token).user
        account = user.account

        return Response({
            "code": account.code,
            "email": str(account.email).strip(),
            "name": str(account.name).strip(),
            "userdata":{
                "username": user.username,
                "email": user.email
            }
        })
