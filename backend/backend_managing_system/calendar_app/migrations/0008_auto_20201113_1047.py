# Generated by Django 3.1.3 on 2020-11-13 10:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calendar_app', '0007_auto_20201112_1254'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rdv',
            name='comment',
            field=models.CharField(blank=True, max_length=5000, null=True),
        ),
    ]
