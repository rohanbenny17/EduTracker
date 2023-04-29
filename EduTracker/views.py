from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse_lazy
from .models import Student, Teacher, Subject, Exam, Mark, Attendance
from django.db import IntegrityError
from django.conf import settings


@login_required(login_url=reverse_lazy('login_view'))
def index(request):
    user = request.user
    if Student.objects.filter(username=user.username).exists():
        return render(request, 'student/index.html')
    elif Teacher.objects.filter(username=user.username).exists():
        return render(request, 'teacher/index.html')
    else:
        return HttpResponseRedirect(reverse_lazy('logout_view'))

def login_view(request):
    if request.method == "POST":
        # Attempt to sign user in
        user_type = request.POST["user"]
        username = request.POST["username"]
        password = request.POST["password"]
        remember_me = request.POST.get("remember-me")

        # Check if the user is a student or a teacher
        try:
            user_model = Student if user_type == 'student' else Teacher
            user = user_model.objects.get(username=username)
        except user_model.DoesNotExist:
            return render(request, 'home/login.html', {
                "msg": "Invalid credentials"
            })
        
        # Authenticate the user
        user = authenticate(request, username=username, password=password, model=settings.AUTH_USER_MODEL)
        if user is not None:
            login(request, user)

            # Set session expiry based on checkbox value
            if remember_me:
                request.session.set_expiry(settings.SESSION_COOKIE_AGE)
                # Set the cookie max-age to the session duration.
                request.session.cookie_age = settings.SESSION_COOKIE_AGE
                # Set the "remember me" flag in the session.
                request.session['remember_me'] = True
            else:
                request.session.set_expiry(0)
                # Clear the "remember me" flag in the session.
                request.session['remember_me'] = False

            return HttpResponseRedirect(reverse_lazy("index"))
        else:
            return render(request, 'home/login.html', {
                "msg": "Invalid credentials"
            })

    return render(request, 'home/login.html')

    

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse_lazy("index"))