EduTracker
==========

EduTracker is a web application designed to cater to the needs of both teachers and students. It is primarily aimed at providing students with a platform where they can view their marks and attendance, while teachers can create, edit and delete the marks and attendance. The app allows teachers to manage their mentees and view the marks of the subject semester-wise of all students. The entire application is built using the Django web framework and uses Django REST Framework for creating API's.

Distinctiveness and Complexity
------------------------------

EduTracker is a unique web application that provides both teachers and students with a common platform to manage their marks and attendance. The app is built with Django and uses Django REST Framework to create API's. It is designed with a focus on scalability, flexibility, and maintainability. The entire application is implemented as a Single Page Application with three tabs on each page. The models used in the app are designed such that every teacher is a mentor and can have many mentees. The mentor can also add new mentees, and the new mentee created can then be able to access the webapp.

The student model is designed such that each student is assigned a mentor, and the mentor is able to view marks of their mentees, view and edit attendance of mentees, edit the profile of the student, delete the student, and also add a new mentee. The teacher model is built in such a way that every teacher is a mentor and can have many mentees. The teacher also has a subject which he teaches. The teacher is able to add a new mentee (thereby creating a new student who is able to access the student page of the webapp), view marks and attendance of mentee, edit attendance of mentee, edit profile (can change the whole profile not only contact details), delete mentee (who then won't be able to access the web app), view profile (which includes info like name date of birth, email, phone number, subject, edit their contact details- only phone number and email), and view marks of the subject semester-wise of all students.

The application also includes features such as a common login page for both students and teachers, where a tab is provided to select whether the user wants to log in to the students' page or teachers' page. If a student tries to log in to the teachers' page using the teachers' tab, an error is shown, and likewise, when a teacher tries to log in to the students' page. The app also provides the option to change the password of their own accounts, and a logout feature to log out from their accounts.

Files Created
-------------

-   `main` : This folder contains all the auto generated files like settings.py, asgi.py, wsgi.py, etc.
-   `EduTracker` : This folder contains all the urls, views, statics, templates, etc of the application. 
-   `api` : This folder contains all the views for the APIs exposed by the application.
-   `manage.py` : This file is used to manage the application.
-   `EduTracker/static` : This folder contains all the static files used by the application.
-   `EduTracker/templates` : This folder contains all the template files used by the application.
-   `static/home` : This folder contains all the static files used by the home page of the application.
-   `static/student` : This folder contains all the static files used by the student page of the application.
-   `static/teacher` : This folder contains all the static files used by the teacher page of the application.
-   `template/home` : This folder contains the template files used by the home page of the application.
-   `template/student` : This folder contains the template files used by the student page of the application.
-   `template/teacher` : This folder contains the template files used by the teacher page of the application.

Installation
------------

Here are the steps to run the application:

1.  Clone the repository..
2.  Install the required packages using `pip install -r requirements.txt`.
3.  Run migrations using `python manage.py migrate`.
4.  Start the server using `python manage.py runserver`.
5.  Open a web browser and go to `http://127.0.0.1:8000` to view the app.

Note: This app requires Python 3.8 or higher.

Additional Information
----------------------

This project has only been tested and works on Windows. The app has been built using Django 4.1.7, Django REST Framework 3.14, and Bootstrap 5. The database used is SQLite. The app requires internet connectivity to work properly. All the CRUD operations are done using the DRF API.

