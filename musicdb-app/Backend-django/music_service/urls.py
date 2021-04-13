from music_service import views
from django.urls import path

urlpatterns = [
    path('forms/', views.forms, name = "forms"),
]
