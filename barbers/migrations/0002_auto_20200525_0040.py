# Generated by Django 3.0.6 on 2020-05-25 00:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('barbers', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='phone',
            field=models.CharField(max_length=12),
        ),
    ]
