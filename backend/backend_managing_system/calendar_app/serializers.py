from rest_framework import serializers
from calendar_app.models import Calendar, TeamLink


class CalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendar
        fields = '__all__'


class TeamLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamLink
        fields = '__all__'
