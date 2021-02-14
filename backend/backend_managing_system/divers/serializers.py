from rest_framework import serializers
from divers.models import Ip_address


class IpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ip_address
        fields = '__all__'
