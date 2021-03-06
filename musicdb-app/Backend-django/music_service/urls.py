from music_service import views
from django.urls import path

urlpatterns = [
    path('forms/', views.forms, name="forms"),
    path('editSong/', views.editSong, name="editSong"),
    path('songsByUser/', views.retrieveSongsByUser, name="songsByUser"),
    path('listAllSongs/', views.retrieveAllSongs, name="listAllSongs"),
    path('deleteSong/', views.deleteSong, name="deleteSong"),
    path('createSong/', views.createSong, name="createSong"),
    path('updateRating/', views.updateRating, name="updateRating"),
    path('login/', views.loginPage, name="loginPage"),
    path('register/', views.registerPage, name="registerPage"),
    path('logMeIn/', views.logMeIn, name="logMeIn"),
    path('logMeOut/', views.logMeOut, name="logMeOut"),
    path('checkLogin/', views.checkLogin, name="checkLogin"),
    path('getUsername/', views.getUsername, name="getUsername"),
    path('createUser/', views.createUser, name="createUser"),

]
