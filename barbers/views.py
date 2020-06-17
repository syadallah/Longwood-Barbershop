from django.http import HttpResponse
## from django.contrib import messages
from django.shortcuts import render, redirect
from barbers.models import Appointment
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login

# Create your views here.
def index(request):
    return render(request, "barbers/index.html")
def appointment(request):
      # POST
  if request.method == 'POST':
      # Save order data to the database
    add = Appointment(
              fname=request.POST.get('fname'),
              lname=request.POST.get('lname'),
              phone=request.POST.get('phone'),
              email=request.POST.get('email'),
              contact=request.POST.get('contact'),
              barber=request.POST.get('barber'),
              date=request.POST.get('myDate'),
              time=request.POST.get('time'),
              comment=request.POST.get('comment'),
            )

    add.save()

    if add is not None:
     context = {
      "client": Appointment.objects.last(),
     }
     return render(request, "barbers/index.html", context)
    else:
      return HttpResponse('{"success": false, "message": "Invalid input"}')

 # GET
  else:
    return render(request, "barbers/appointment.html")

def login_view(request):
  # POST
  if request.method == 'POST':

    # Grab username & password submitted via POST request & make sure that both
    # fields are not empty
    username = request.POST["username"]
    password = request.POST["password"]
    if username == '' or password == '':
      return HttpResponse('{"success": false, "message": "Both username and password are required."}')

    # Django built-in username & password authentication + login session -- by
    # logging the user in, request.user.is_authenticated == True in the
    # def index(request): route.
    user = authenticate(request, username=username, password=password)
    if user is not None:
      login(request, user)
      return HttpResponse('{"success": true, "message": ""}')
    else:
      return HttpResponse('{"success": false, "message": "Invalid username and/or password."}')

  # GET
  else:
    return render(request, "barbers/appointment.html")
# ============================ REGISTER ==========================================

def register_view(request):

  # Grab username & password submitted via POST request and make sure that no
  # fields are empty.
  username = request.POST['username']
  password = request.POST['password']
  first_name = request.POST['first_name']
  last_name = request.POST['last_name']
  email = request.POST['email']
  if username == '' or password == '' or first_name == '' or last_name == '' or email == '':
    return HttpResponse('{"success": false, "message": "All fields must be completed."}')
    # Try to see if the username already exists in the database; if not, register
  # a new user.
  try:
    User.objects.get(username=username)
    return HttpResponse('{"success": false, "message": "Username already exists."}')
  except:
     # Create a User instance/object which is used with Django's authentication
    # system.
    user = User.objects.create_user(username, email, password)
    user.first_name = first_name
    user.last_name = last_name
    user.save()

      # Django built-in username & password authentication + login session -- by
    # logging the user in, request.user.is_authenticated == True in the
    # def index(request): route.
    user = authenticate(request, username=username, password=password)
    login(request, user)
    return HttpResponse('{"success": true, "message": ""}')
