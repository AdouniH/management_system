# Generated by Django 3.1.3 on 2021-02-16 20:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_app', '0003_account_route'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='route',
            field=models.CharField(blank=True, choices=[('calendar', 'calendar'), ('route', 'route'), ('data', 'data')], max_length=300, null=True),
        ),
    ]
