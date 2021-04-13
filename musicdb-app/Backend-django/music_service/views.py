from django.shortcuts import render
from .forms import RegisterForm, RetreiveSongs, RetrieveArtists
from .models import User, Artist, Rating, SongDetail

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
            context["songsByUsername"], context["retrieveSongsUsernameStatus"]  = retrieveSongsByUsername(request)
        if "retrieveArtists" in request.GET:
            context["songsByArtist"], context["retreveSongsArtistStatus"]  = retrieveSongsByArtist(request)

    return render(request, "music_service/forms.html", context)

def register(request):
    form = RegisterForm(request.POST or None)
    status = " "
    if form.is_valid():
        password = form.cleaned_data.get("password")
        username = form.cleaned_data.get("username")
        try:
            User.objects.get(username = username)
            status = "Username already exists! Please choose another username!"
        except:
            if (password == ""):
                status = "Please enter a password!"
            else:
                User.objects.create(username = username, password = password)
                status = "Signup done successfully!"
    return status

def retrieveSongsByUsername(request):
    form = RetreiveSongs(request.GET or None)
    status = " "
    data = []
    if form.is_valid():
        username = form.cleaned_data.get("username")
        try:
            user = User.objects.filter(username = username).first()
            data = Rating.objects.filter(username = user)
            data = list(data)
        except Exception as inst:
            print("error is:", inst)
            status = "Username does not exist inside the database"

    return (data, status)

def retrieveSongsByArtist(request):
    form = RetrieveArtists(request.GET or None)
    status = " "
    data = []
    result = []
    if form.is_valid():
        artist = form.cleaned_data.get("artist")
        try:
            data = Artist.objects.filter(artist = artist)
            for row in data:

                new_data = SongDetail.objects.filter(artist = row).values()[0]

                result.append({"song": row.song, "artist": row.artist, "duration": new_data['duration'],  'year_of_release': new_data['year_of_release'], "genre": new_data['name']})


            if result==[]:
                status = "No songs by that artist!"
        except Exception as inst:
            print("error is:", inst)
            status = "No songs by that artist"

    return (result, status)