from django.shortcuts import render
from calendar_app.business.business import arrange_crenaux, datetime_to_readable, extract_hour
from rest_framework import status

from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from calendar_app import doc
from datetime import date, timedelta
from calendar_app.models import Calendar, TeamLink, SkypeLink, Rdv
from calendar_app.serializers import CalendarSerializer, TeamLinkSerializer, RdvSerializer

from calendar_app.business import email
from django.core.mail import send_mail
from django.core.mail import EmailMessage


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
        try:
            cr = Calendar.objects.get(id=creneau_id)
            serializer = CalendarSerializer(cr)
            context = serializer.data
            date = datetime_to_readable(cr.creneau)
            hour = extract_hour(cr.creneau)

            context.update({'hour': hour, 'date': date})
            return Response(context, status=status.HTTP_200_OK)
        except:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)


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
            rdv = serializer.save()
            cal = Calendar.objects.get(id=serializer.data['crenau'])
            cal.booked = True
            cal.save()

            readable_time = '{} à {}'.format(datetime_to_readable(cal.creneau), extract_hour(cal.creneau))

            if serializer.data['tool'] == 'teams':
                try:
                    link = TeamLink.objects.all()[0]
                    if link.link:
                        rdv.link = link.link
                        rdv.save()
                        link.delete()
                        EmailMessage(
                            "Confirmation d'entretion du {}".format(readable_time),
                            email.email_body_with_team_link.format(
                                time=readable_time,
                                link=rdv.link
                            ),
                            'Serveur de Houssem ADOUNI <noreply.houssem.adouni@gmail.com>',
                            [serializer.data['email']],
                            cc=['houssemadouni11@gmail.com']
                        ).send(fail_silently=True)
                except:
                    EmailMessage(
                        "Confirmation d'entretion du {}".format(readable_time),
                        email.email_body_without_team_link.format(
                            time=readable_time
                        ),
                        'Serveur de Houssem ADOUNI <noreply.houssem.adouni@gmail.com>',
                        [serializer.data['email']],
                        cc=['houssemadouni11@gmail.com']
                    ).send(fail_silently=True)


            elif serializer.data['tool'] == 'skype':
                try:
                    link = SkypeLink.objects.all()[0]
                    if link.link:
                        rdv.link = link.link
                        rdv.save()
                        link.delete()

                    EmailMessage(
                        "Confirmation d'entretion du {}".format(readable_time),
                        email.email_body_skype.format(
                            link=rdv.link,
                            time=readable_time
                        ),
                        'Serveur de Houssem ADOUNI <noreply.houssem.adouni@gmail.com>',
                        [serializer.data['email']],
                        cc=['houssemadouni11@gmail.com']
                    ).send(fail_silently=True)
                except:
                    EmailMessage(
                        "Confirmation d'entretion du {}".format(readable_time),
                        email.email_body_skype_without_link.format(
                            link=rdv.link,
                            time=readable_time
                        ),
                        'Serveur de Houssem ADOUNI <noreply.houssem.adouni@gmail.com>',
                        [serializer.data['email']],
                        cc=['houssemadouni11@gmail.com']
                    ).send(fail_silently=True)

            elif serializer.data['tool'] == 'phone':
                EmailMessage(
                    "Confirmation d'entretion du {}".format(readable_time),
                    email.email_body_phone.format(
                        time=readable_time
                    ),
                    'Serveur de Houssem ADOUNI <noreply.houssem.adouni@gmail.com>',
                    [serializer.data['email']],
                    cc=['houssemadouni11@gmail.com']
                ).send(fail_silently=True)

            serializer = RdvSerializer(rdv)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
