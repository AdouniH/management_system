# Generated by Django 3.1.3 on 2021-02-14 20:11

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calendar_app', '0038_auto_20210214_2106'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rdv',
            name='picked_at',
            field=models.DateTimeField(default=datetime.datetime(2021, 2, 14, 21, 11, 35, 859111)),
        ),
    ]
