# Generated by Django 3.2 on 2021-04-16 23:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music_service', '0008_alter_artist_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='artist',
            name='song',
            field=models.CharField(default='temp song', max_length=255),
            preserve_default=False,
        ),
    ]
