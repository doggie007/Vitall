# Generated by Django 3.2.5 on 2021-07-30 17:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('calendarapp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='quota',
        ),
    ]
