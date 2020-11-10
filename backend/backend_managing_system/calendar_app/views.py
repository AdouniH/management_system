from django.shortcuts import render
from calendar_app.business import arrange_crenaux

from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from calendar_app import doc
from datetime import date, timedelta
from calendar_app.models import Calendar, TeamLink
from calendar_app.serializers import CalendarSerializer, TeamLinkSerializer


class CalendarView(APIView):

    def get(self, request, format=None):
        start_date = date.today() + timedelta(days=1)
        end_date = start_date + timedelta(days=15)

        clds = Calendar.objects.filter(
                creneau__range=[start_date, end_date]
        ).order_by('creneau')

        clds = Calendar.objects.all().order_by('creneau')

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
