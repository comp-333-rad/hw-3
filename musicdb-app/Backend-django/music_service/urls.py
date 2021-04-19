from music_service import views
from django.urls import path

urlpatterns = [
    path('forms/', views.forms, name="forms"),
    path('editSong/', views.editSong, name="editSong"),
    path('songsByUser/', views.retrieveSongsByUser, name="songsByUser"),
    path('deleteSong/', views.deleteSong, name="deleteSong"),
    path('createSong/', views.createSong, name="createSong"),
    path('updateRating/', views.updateRating, name="updateRating"),

]
