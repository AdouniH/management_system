# Generated by Django 3.1.3 on 2021-01-10 17:52

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calendar_app', '0026_auto_20210109_1820'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rdv',
            name='picked_at',
            field=models.DateTimeField(default=datetime.datetime(2021, 1, 10, 17, 51, 52, 599938)),
        ),
    ]
