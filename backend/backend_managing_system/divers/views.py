
from rest_framework.views import APIView
from rest_framework.response import Response
from divers.serializers import IpSerializer


class Ip(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        serializer = IpSerializer(data=request.query_params)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
            
        return Response(serializer.errors)
