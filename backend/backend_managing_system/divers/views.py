
from rest_framework.views import APIView
from rest_framework.response import Response
from divers.serializers import IpSerializer


class Ip(APIView):

    def get(self, request, format=None):

        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        
        ip1 = 'None'
        if x_forwarded_for:
            ip1 = x_forwarded_for.split(',')[0]
        
        ip2 = request.META.get('REMOTE_ADDR')

        serializer = IpSerializer(data={'ip': '{} / {}'.format(ip1, ip2)})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
            
        return Response(serializer.errors)
