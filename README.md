# Longwood-Barbershop
![Image description](https://i.imgur.com/lHalOGu.png)\

# Description

It is a website built using Django that features the services for a barbershop called "Longwood" and allows visitors to book apppointment.


# Configuration, Structure - Run Locally

- Navigate to the ~/project3 folder and run pip3 install -r requirements.txt to make sure that Django is installed -- requirements.txt lists Django==3.0.6

- Start the Django Barbershop application from within ~/project4 by running:

  $ python manage.py runserver

  ... and the website should be accessible at 127.0.0.1:8000.


  > Within the longwood/ folder:

    1. settings.py -- the only thing which has been added to it are some settings involving the static/ folder.

    2. urls.py
      - links "" to barbers/urls.py
      - links "admin/" to a built-in Django app which allows a GUI to interact with and modify postgresql.

  > Within the barbers/ folder:

    1. urls.py -- establishes all of the URL syntax for the orders app (which has been linked from the urls.py file within the longwood/ folder), and links these URL routes to functions within the views.py file

    2. views.py -- controls what happens when a user visits a URL route (acts like app.py, or application.py, in a FLASK application)

    3. models.py -- create the structure of tables to be used with the postgresql
      - to create the SQL commands to reflect the changes to any tables within models.py, you create a "migration" file, which is stored in ~/barbers/migrations/, by running:

        $ python manage.py makemigrations

      - to apply the SQL located within migration files and alter the database, run:

        $ python.manage.py migrate

    4. admin.py -- add models from ~/barbers/models.py to admin.py in order to track them using the built-in Django admin GUI

- To open the Django shell where you can run Python commands, including commands that can manipulate the sqlite3 database, navigate to ~/project4 and run:

    $ python manage.py shell

# What's contained in the files

_appointment.html, views.py_

_index.html, index.js, models.py, views.py_
  - The index.html page displays a header with links to services, appointment, and team to view the application features.

  - Below the header there are two sections: the Our services and  Our Team
