from django.contrib import admin
from django.contrib.auth.models import User
from music_service.models import Artist, Rating, SongDetail
# admin.site.register(User)
admin.site.register(Artist)
admin.site.register(Rating)
admin.site.register(SongDetail)
