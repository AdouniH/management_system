# Generated by Django 3.1.3 on 2021-02-13 15:52

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calendar_app', '0034_auto_20210129_1920'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rdv',
            name='picked_at',
            field=models.DateTimeField(default=datetime.datetime(2021, 2, 13, 15, 52, 7, 295687)),
        ),
    ]
