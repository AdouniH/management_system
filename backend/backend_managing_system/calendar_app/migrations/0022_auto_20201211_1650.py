# Generated by Django 3.1.3 on 2020-12-11 16:50

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calendar_app', '0021_auto_20201211_1320'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rdv',
            name='picked_at',
            field=models.DateTimeField(default=datetime.datetime(2020, 12, 11, 16, 49, 58, 158123)),
        ),
    ]
