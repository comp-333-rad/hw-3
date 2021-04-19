from django.db import models


class User(models.Model):
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.username


class Artist(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class SongDetail(models.Model):
    id = models.AutoField(primary_key=True)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    year_of_release = models.IntegerField(default=0)
    name = models.CharField(max_length=255)
    duration = models.IntegerField(default=0)


class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    song = models.ForeignKey(SongDetail, on_delete=models.CASCADE)
    # username = models.PrimaryKey(User.username + song, on_delete=models.CASCADE)
    rating = models.IntegerField()
