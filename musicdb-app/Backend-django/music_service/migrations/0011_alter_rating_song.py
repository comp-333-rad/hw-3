# Generated by Django 3.2 on 2021-04-16 23:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('music_service', '0010_auto_20210416_2323'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rating',
            name='song',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='music_service.songdetail'),
        ),
    ]