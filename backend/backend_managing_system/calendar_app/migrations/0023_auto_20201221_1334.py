# Generated by Django 3.1.3 on 2020-12-21 13:34

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calendar_app', '0022_auto_20201211_1650'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rdv',
            name='picked_at',
            field=models.DateTimeField(default=datetime.datetime(2020, 12, 21, 13, 33, 59, 118969)),
        ),
    ]