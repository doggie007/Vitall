from rest_framework import serializers
from .models import Event
class EventListSerializer(serializers.ModelSerializer):

    organiser_name = serializers.CharField(source='organiser.organisation')
    class Meta:
        model = Event
        fields = (
            "id",
            "organiser_name",
            "food",
            "location",
            "long",
            "lat",
            "start",
            "end",
        )

class EventCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = (
            "food",
            "location",
            "long",
            "lat",
            "start",
            "end",
        )

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = (
            "id",
            "food",
            "location",
            "long",
            "lat",
            "start",
            "end",
        )