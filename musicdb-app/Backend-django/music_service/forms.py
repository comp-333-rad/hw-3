from django import forms

class RegisterForm(forms.Form):
    username = forms.CharField(label="Username", required  =True, max_length=70)
    password = forms.CharField(label="Password", widget = forms.PasswordInput, required = True, min_length=5)

class RetreiveSongs(forms.Form):
    username = forms.CharField(required = True, label = "Search Username")

class RetrieveArtists(forms.Form):
    artist = forms.CharField(required = True, label = "Search Artist")