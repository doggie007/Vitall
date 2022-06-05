from django.urls import path

from .views import (
    EventListView,
    EventUpdateView,
    MyEventListView,
    EventCreateView,
    EventUpdateView
)

urlpatterns = [
    path('events/', EventListView.as_view(), name='events'),
    path('my-events/', MyEventListView.as_view(), name='myevents'),
    path('create-event/', EventCreateView.as_view(), name="create"),
    path('update-event/<int:pk>', EventUpdateView.as_view(), name="update")
] 