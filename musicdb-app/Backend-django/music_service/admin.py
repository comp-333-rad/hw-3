from django.contrib import admin
from music_service.models import User, Artist, Rating, SongDetail
admin.site.register(User)
admin.site.register(Artist)
admin.site.register(Rating)
admin.site.register(SongDetail)