from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from auth_app.models import Account
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class AccountTests(APITestCase):

    def test_post_CodeValidator(self):

        user_houssem = User(username="houssem", password="123")
        user_houssem.save()

        account_houssem = Account(code="helloworld", user=user_houssem)
        account_houssem.save()

        url = reverse('code_validator')
        data = {'code': 'helloworld'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        username = Token.objects.get(key=response.data['token']).user.username
        self.assertEqual(username, 'houssem')
