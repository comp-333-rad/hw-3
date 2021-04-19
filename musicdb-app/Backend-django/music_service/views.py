from django.shortcuts import render, redirect
from .forms import RegisterForm, RetreiveSongs, RetrieveArtists
from .models import Artist, Rating, SongDetail
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.core import serializers
import ast


user_id_header = "username"


def registerPage(request):
    form = UserCreationForm()
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/login')
    context = {'form': form}

    return render(request, "music_service/register.html", context)


def loginPage(request):
    if request.method == "POST":

        username = request.POST.get('username')
        password = request.POST.get('password')

        print("username is:", username)
        print("password is:", password)

        user = authenticate(request, username=username, password=password)

        if user is not None:

            print("hello")
            login(request, user)
            return redirect('http://localhost:3000')
    context = {}
    return render(request, 'music_service/login.html', context)


def logMeIn(request):
    print("username is:", request.headers[user_id_header])
    user = authenticate(
        username=request.headers[user_id_header], password=request.headers["password"])
    print("user:", user)
    data = {}
    status = ""
    if user is not None:
        print("user not none")
        login(request, user)
        data = {"loggedIn": True}
        status = "All Good!"
        # return redirect("http://localhost:3000")
    else:
        data = {"loggedIn": False}
        status = "Failed to log in"
    return HttpResponse(data, status)


def createUser(request):
    user = User.objects.create_user(
        request.headers[user_id_header], request.headers["email"], request.headers["password"])
    user.save()
    return HttpResponse('', "User Created")


@login_required(login_url="/login")
def forms(request):
    registration = RegisterForm()
    retrieveSongs = RetreiveSongs()
    retrieveArtists = RetrieveArtists()
    songsByUsername = []
    songsByArtist = []
    context = {"registration": registration,
               "retrieveSong": retrieveSongs,
               "retrieveArtists": retrieveArtists,
               "songsByUsername": songsByUsername,
               "songsByArtist": songsByArtist,
               "registerStatus": "",
               "retrieveSongsUsernameStatus": "",
               "retreveSongsArtistStatus": ""
               }

    if request.method == 'POST':
        if 'register' in request.POST:
            context["registerStatus"] = register(request)
    if request.method == 'GET':
        if 'retrieveSongs' in request.GET:
            context["songsByUsername"], context["retrieveSongsUsernameStatus"] = retrieveSongsByUsername(
                request)
        if "retrieveArtists" in request.GET:
            context["songsByArtist"], context["retreveSongsArtistStatus"] = retrieveSongsByArtist(
                request)

    return render(request, "music_service/forms.html", context)


def register(request):
    form = RegisterForm(request.POST or None)
    status = " "
    if form.is_valid():
        password = form.cleaned_data.get("password")
        username = form.cleaned_data.get("username")
        try:
            User.objects.get(username=username)
            status = "Username already exists! Please choose another username!"
        except:
            if (password == ""):
                status = "Please enter a password!"
            else:
                User.objects.create(username=username, password=password)
                status = "Signup done successfully!"
    return status


def retrieveAllSongs(request):
    print("starting retrieve all songs")
    status = "All Good!"
    data = []
    try:
        data = SongDetail.objects.all()
        data = list(data)
        data = serializers.serialize(
            'json', data, use_natural_foreign_keys=True)
    except Exception as inst:
        print("error is:", inst)
        status = "Error when listing all songs"
    print("data is:", data)
    return HttpResponse(data, status)


def retrieveSongsByUser(request):
    print("starting retrive songs by user")
    user_id = request.headers[user_id_header]
    print("user_id is:", user_id)
    status = " "
    data = []
    try:
        user = User.objects.filter(username=user_id).first()
        data = Rating.objects.filter(user=user)
        data = list(data)
    except Exception as inst:
        print("error is:", inst)
        status = "Username does not exist inside the database"
    print("data is:", data)
    return HttpResponse(data, status)


def retrieveSongsByArtist(request):
    form = RetrieveArtists(request.GET or None)
    status = " "
    data = []
    result = []
    if form.is_valid():
        artist = form.cleaned_data.get("artist")
        try:
            data = Artist.objects.filter(artist=artist)
            for row in data:

                new_data = SongDetail.objects.filter(artist=row).values()[0]

                result.append({"song": row.song, "artist": row.artist,
                              "duration": new_data['duration'],  'year_of_release': new_data['year_of_release'], "genre": new_data['name']})

            if result == []:
                status = "No songs by that artist!"
        except Exception as inst:
            print("error is:", inst)
            status = "No songs by that artist"

    return (result, status)


def editSong(request):
    user_id = request.headers[user_id_header]
    song_id = request.headers["song-id"]
    # new_song_details = request.headers["new-song-details"]
    # get the song
    print("request.body is:", type(request.body))
    body = ast.literal_eval(request.body.decode('utf-8'))
    status = "All Good!"
    try:
        song = SongDetail.objects.filter(id=song_id).first()
        print(getattr(song, "id"))

    except Exception as inst:
        print("error is:", inst)
        status = "ERROR OCCURRED WHEN TRYING TO FIND SONG IN EDIT SONG"
    for field in ["name", "artist", "year_of_release", "duration"]:
        print("field is:", field, "with a value of:", body[field])
        if field == "artist":
            artist = Artist.objects.filter(name=body[field]).first()
            if artist == None:
                artist = Artist.objects.create(name=body[field])
            print(artist)
            setattr(song, field, Artist.objects.filter(
                name=body[field]).first())
        else:
            setattr(song, field, body[field])

    song.save()
    return HttpResponse('', status)
    # return (result, status)


def deleteSong(request):
    user_id = request.headers[user_id_header]
    song_id = request.headers["song-id"]
    status = "All Good!"
    try:
        song = SongDetail.objects.filter(id=song_id).first()
    except Exception as inst:
        print("error is:", inst)
        status = "ERROR OCCURRED WHEN TRYING TO DELETE SONG"
    song.delete()
    return HttpResponse('', status)


def createSong(request):
    user_id = request.headers[user_id_header]
    status = "All Good!"
    body = ast.literal_eval(request.body.decode('utf-8'))
    print("body in create song is:", body)
    try:
        artist = Artist.objects.filter(name=body["artist"]).first()
        if artist == None:
            artist = Artist.objects.create(name=body["artist"])
        song = SongDetail.objects.create(
            name=body["name"], artist=artist, year_of_release=body["year_of_release"], duration=body["duration"])
        song.save()
        rateSong(user_id, song.id, body["rating"])

    except Exception as inst:
        print("error is:", inst)
        status = "ERROR OCCURRED WHEN TRYING TO CREATE SONG"
    return HttpResponse('', status)


def rateSong(user_id, song_id, rating):
    song = SongDetail.objects.filter(id=song_id).first()
    try:
        user = User.objects.filter(username=user_id).first()
        try:
            ratingObj = Rating.objects.filter(
                user=user, song=song).first()
        except:
            pass
        if ratingObj == None:
            ratingObj = Rating.objects.create(
                user=user, song=song, rating=rating)
        else:
            ratingObj.rating = rating
        ratingObj.save()
        updateAvgRating(song)

    except Exception as inst:
        print("error in rateSong is:", inst)
        raise()


def updateRating(request):
    status = "All Good!"
    try:
        user_id = request.headers[user_id_header]
        body = ast.literal_eval(request.body.decode('utf-8'))
        rating = body["rating"]
        song_id = request.headers["song-id"]
        rateSong(user_id, song_id, rating)
    except Exception as inst:
        print("error is:", inst)
        status = "ERROR OCCURRED WHEN TRYING TO UPDATE RATING"
    return HttpResponse('', status)


def updateAvgRating(song):
    try:
        ratings = Rating.objects.filter(
            song=song).all().values_list('rating', flat=True)
        ratings = list(ratings)
        avg_rating = sum(ratings) / len(ratings)
        song.average_rating = avg_rating
        song.save()
    except Exception as inst:
        print("error is:", inst)
        status = "ERROR OCCURRED WHEN TRYING TO UPDATE AVERAGE RATING"
