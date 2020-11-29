
from rest_framework import serializers
from btg.models import Register


class BtgSerializer(serializers.ModelSerializer):
    class Meta:
        model = Register
        fields = '__all__'
