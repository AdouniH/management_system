# Generated by Django 3.1.3 on 2020-12-05 07:53

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calendar_app', '0018_auto_20201205_0753'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rdv',
            name='picked_at',
            field=models.DateTimeField(default=datetime.datetime(2020, 12, 5, 7, 53, 32, 264286)),
        ),
    ]
