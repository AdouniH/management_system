from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework import status


token_from_code = swagger_auto_schema(
    operation_summary="Get token from code",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['code'],
        properties={
            'code': openapi.Schema(type=openapi.TYPE_STRING, title="code of account"),
        }
    ),
    responses={
        status.HTTP_200_OK: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'token': openapi.Schema(type=openapi.TYPE_STRING, title='the token key'),
                'userdata': openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'username': openapi.Schema(type=openapi.TYPE_STRING, title="username"),
                        'email': openapi.Schema(type=openapi.TYPE_STRING, title="email"),
                    }
                ),
            }
        )
    }
)


code_from_token = swagger_auto_schema(
    operation_summary="Get userData from token",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['token'],
        properties={
            'token': openapi.Schema(type=openapi.TYPE_STRING, title="token key"),
        }
    ),
    responses={
        status.HTTP_200_OK: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'code': openapi.Schema(type=openapi.TYPE_STRING, title='code of account'),
                'userdata': openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'username': openapi.Schema(type=openapi.TYPE_STRING, title="username"),
                        'email': openapi.Schema(type=openapi.TYPE_STRING, title="email"),
                    }
                ),
            }
        )
    }
)
