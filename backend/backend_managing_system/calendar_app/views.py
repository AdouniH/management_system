from django.shortcuts import render
from calendar_app.business.business import arrange_crenaux
from rest_framework import status

from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from calendar_app import doc
from datetime import date, timedelta
from calendar_app.models import Calendar, TeamLink, Rdv
from calendar_app.serializers import CalendarSerializer, TeamLinkSerializer, RdvSerializer

from calendar_app.business import email
from django.core.mail import send_mail


class CalendarView(APIView):

    def get(self, request, format=None):
        start_date = date.today() + timedelta(days=1)
        end_date = start_date + timedelta(days=15)

        clds = Calendar.objects.filter(
                creneau__range=[start_date, end_date],
                booked=False
        ).order_by('creneau')

        return Response(arrange_crenaux(clds))

class ShotPicker(APIView):
    def get(self, request, creneau_id, format=None):
        cr = Calendar.objects.get(id=creneau_id)
        serializer = CalendarSerializer(cr)
        return Response(serializer.data)


class TeamsLInkPicker(APIView):
    def get(self, request, format=None):
        cr = TeamLink.objects.filter(booked=False).first()
        serializer = TeamLinkSerializer(cr)
        return Response(serializer.data)


class RdvView(APIView):
    def get(self, request, format=None):
        rdvs = Rdv.objects.all()
        serializer = RdvSerializer(rdvs, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = RdvSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            cal = Calendar.objects.get(id=serializer.data['crenau'])
            cal.booked = True
            cal.save()

            if serializer.data['tool'] == 'teams':
                link = TeamLink.objects.get(link=serializer.data['teams_link'])
                link.delete()

                send_mail(
                    'Subject here',
                    email.email_body,
                    'noreply.houssem.adouni@gmail.com',
                    [serializer.data['email']],
                    fail_silently=False,
                )
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
