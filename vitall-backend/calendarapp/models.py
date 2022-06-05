from django.db import models
from users.models import User

class Event(models.Model):

    organiser = models.ForeignKey(User,on_delete=models.CASCADE)

    food = models.CharField(max_length=255)

    # store location
    location = models.CharField(max_length=255)
    long = models.DecimalField(max_digits=9, decimal_places=6)
    lat = models.DecimalField(max_digits=9, decimal_places=6)

    # store time
    start = models.DateTimeField()
    end = models.DateTimeField()


    def __str__(self):
        return f"{self.organiser.organisation} hands out {self.food}"