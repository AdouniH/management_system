# Generated by Django 3.1.3 on 2020-12-05 04:04

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calendar_app', '0015_auto_20201203_0229'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rdv',
            name='picked_at',
            field=models.DateTimeField(default=datetime.datetime(2020, 12, 5, 4, 3, 38, 521452)),
        ),
    ]
