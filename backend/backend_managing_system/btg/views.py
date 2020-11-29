from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from btg.models import Register
from btg.serializers import BtgSerializer
from rest_framework import status


class RegisterView(APIView):
    def get(self, request, format=None):
        registers = Register.objects.all().order_by('-ntf')
        data = BtgSerializer(registers, many=True).data
        data = list(map(lambda x: list(x.values())[1:], data))
        return Response(data)

    def post(self, request, format=None):
        register = Register.objects.filter(ntf=request.data['ntf'])
        data = BtgSerializer(register, many=True).data
        data = list(map(lambda x: list(x.values())[1:], data))
        return Response(data)

class DetailView(APIView):
    def get(self, request, ntf, format=None):
        register = Register.objects.get(ntf=ntf)
        serializer = BtgSerializer(register)
        data = serializer.data
        data.pop('id')
        return Response(data)

    def put(self, request, ntf, format=None):
        reg = Register.objects.get(ntf=ntf)
        serializer = BtgSerializer(reg, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, ntf, format=None):
        register = Register.objects.get(ntf=ntf)
        register.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CreationView(APIView):
    def post(self, request, format=None):
        serializer = BtgSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
