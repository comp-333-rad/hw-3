# Generated by Django 3.2 on 2021-04-19 21:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music_service', '0013_auto_20210419_2140'),
    ]

    operations = [
        migrations.AddField(
            model_name='songdetail',
            name='average_rating',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=9),
        ),
    ]
