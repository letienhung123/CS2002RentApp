# Generated by Django 5.0.4 on 2024-05-01 08:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('renting', '0005_remove_post_status_room_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_owner',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='phone_num',
            field=models.CharField(max_length=50, null=True),
        ),
    ]