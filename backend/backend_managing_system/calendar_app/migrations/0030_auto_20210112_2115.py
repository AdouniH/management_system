# Generated by Django 3.1.3 on 2021-01-12 21:15

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calendar_app', '0029_auto_20210112_2114'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rdv',
            name='picked_at',
            field=models.DateTimeField(default=datetime.datetime(2021, 1, 12, 21, 15, 0, 719576)),
        ),
    ]
