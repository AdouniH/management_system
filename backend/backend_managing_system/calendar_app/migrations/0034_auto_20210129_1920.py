# Generated by Django 3.1.3 on 2021-01-29 19:20

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calendar_app', '0033_auto_20210129_1829'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rdv',
            name='picked_at',
            field=models.DateTimeField(default=datetime.datetime(2021, 1, 29, 19, 20, 39, 860969)),
        ),
    ]
