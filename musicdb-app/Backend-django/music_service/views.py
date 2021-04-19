from django.shortcuts import render
from .forms import RegisterForm, RetreiveSongs, RetrieveArtists
from .models import User, Artist, Rating, SongDetail
from django.http import HttpResponse
import ast


user_id_header = "username"


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


def retrieveSongsByUser(request):
    print("starting retrive songs by user")
    username = request.headers[user_id_header]
    print("username is:", username)
    status = " "
    data = []
    try:
        user = User.objects.filter(username=username).first()
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
    for field in ["name", "artist", "year_of_release"]:
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
    return HttpResponse('')
    # return (result, status)
