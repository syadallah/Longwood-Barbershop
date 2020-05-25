from django.http import HttpResponse
from django.shortcuts import render
from barbers.models import Appointment
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
            barber=request.POST.get('barber'),
            date=request.POST.get('myDate'),
            time=request.POST.get('time'),
            comment=request.POST.get('comment')
          )
    add.save()
 # GET
  else:
      return render(request, "barbers/appointment.html")
