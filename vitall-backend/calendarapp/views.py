from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import EventListSerializer,EventCreateSerializer,EventSerializer
from rest_framework.generics import UpdateAPIView, DestroyAPIView
from .models import Event
from datetime import datetime
from django.shortcuts import get_object_or_404

class EventListView(APIView):
    serializer_class = EventListSerializer
    permission_classes = (AllowAny,)

    def get(self, request):
        events = Event.objects.all()
        serializer = self.serializer_class(events, many=True)

        response = {
            'success': True,
            'status_code': status.HTTP_200_OK,
            'message': 'Successfully fetched events',
            'events': serializer.data,
        }
        return Response(response, status=status.HTTP_200_OK)
    
class MyEventListView(APIView):
    serializer_class = EventListSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        events = Event.objects.filter(organiser=user)
        serializer = self.serializer_class(events, many=True)

        response = {
            'success': True,
            'status_code': status.HTTP_200_OK,
            'message': 'Successfully fetched your events',
            'events': serializer.data,
        }
        return Response(response, status=status.HTTP_200_OK)
    
    
class EventCreateView(APIView):
    serializer_class = EventCreateSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        def toDT(s):
            return datetime.strptime(s,'%Y-%m-%dT%H:%M')
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=True)
        print(serializer.validated_data['start'])
        if serializer.validated_data['start'] > serializer.validated_data['end']:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': False,
                'statusCode': status_code,
                'message': "Start time cannot be greater than end time"
            }
            return Response(response,status=status_code)
        if valid:
            serializer.save(organiser = request.user)
            status_code = status.HTTP_201_CREATED
            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'Event successfully added!',
            }

            return Response(response, status=status_code)


class EventUpdateView(APIView):
    serializer_class = EventSerializer
    permission_classes = (IsAuthenticated,)
    def put(self, request, pk):
        print(request)
        print(pk)
        user = request.user
        try:
            event = Event.objects.filter(organiser=user).get(pk=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = EventSerializer(event, data=request.data)
        valid = serializer.is_valid(raise_exception=True)
        if serializer.validated_data['start'] > serializer.validated_data['end']:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': False,
                'statusCode': status_code,
                'message': "Start time cannot be greater than end time"
            }
            return Response(response,status=status_code)
        if valid:
            serializer.save()
            status_code = status.HTTP_200_OK
            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'Event successfully updated!',
            }

            return Response(response, status=status_code)

