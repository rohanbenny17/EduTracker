from django.urls import path
from . import views


urlpatterns = [
    path("student", views.get_all_students),
    path("student/id/<int:id>", views.get_one_student),
    path("mark/id/<int:id>", views.get_one_mark),
    path("attendance/id/<int:id>", views.get_one_attendance),
    path("attendance/id/<int:id>/sem/<int:semester>", views.get_sem_attendance),
    path("teacher/id/<int:id>", views.get_one_teacher),
    path("mentee/id/<int:id>", views.get_all_mentee),
    path("subject/teacher/<int:id>/sem/<int:semester>/term/<int:term>", views.get_exam_mark),
    path("password/teacher/<int:id>", views.teacher_password),
    path("password/student/<int:id>", views.student_password),
]