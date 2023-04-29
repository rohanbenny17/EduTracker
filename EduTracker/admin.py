from django.contrib import admin
from .models import Student, Teacher, Subject, Exam, Mark, Attendance

# Register your models here.
class StudentAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name','username', 'email', 'password', 'phone_no', 'dob', 'mentor', 'year_of_admission')

class TeacherAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name','username', 'email', 'password', 'phone_no', 'dob', 'subject')

class SubjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

class ExamAdmin(admin.ModelAdmin):
    list_display = ('id', 'number', 'semester', 'subject')

class MarkAdmin(admin.ModelAdmin):
    list_display = ('id', 'student', 'exam', 'mark')

class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('id', 'student', 'semester', 'percentage')

admin.site.register(Student, StudentAdmin)
admin.site.register(Teacher, TeacherAdmin)
admin.site.register(Subject, SubjectAdmin)
admin.site.register(Exam, ExamAdmin)
admin.site.register(Mark, MarkAdmin)
admin.site.register(Attendance, AttendanceAdmin)