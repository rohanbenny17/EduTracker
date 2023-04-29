from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    id = models.SmallAutoField(primary_key=True)
    phone_no = models.CharField(max_length=10, null=True, unique=True)
    dob = models.DateField(null=True)

    groups = models.ManyToManyField(
        'auth.Group', related_name='user_groups', blank=True, help_text=(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        )
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission', related_name='user_permissions', blank=True, help_text='Specific permissions for this user.'
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    

class Student(User):
    mentor = models.ForeignKey('Teacher', on_delete=models.CASCADE, null=True, related_name="mentee")
    year_of_admission = models.IntegerField(null=True)

    class Meta:
        verbose_name = "Student"
        verbose_name_plural = "Students"


class Teacher(User):
    subject = models.OneToOneField('Subject', on_delete=models.CASCADE, null=True, related_name="teacher")

    class Meta:
        verbose_name = "Teacher"
        verbose_name_plural = "Teachers"

class Subject(models.Model):
    id = models.SmallAutoField(primary_key=True)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    

class Exam(models.Model):
    id = models.SmallAutoField(primary_key=True)
    number = models.CharField(max_length=1)
    semester = models.CharField(max_length=1)
    subject = models.ForeignKey('Subject', on_delete=models.CASCADE, null=True, related_name="exams")

    def __str__(self):
        return f"Sem - {self.semester} | Sub - {self.subject} | Mid term - {self.number}"


class Mark(models.Model):
    id = models.SmallAutoField(primary_key=True)
    student = models.ForeignKey('Student', on_delete=models.CASCADE, null=True, related_name="marks")
    exam = models.ForeignKey('Exam', on_delete=models.CASCADE, null=True, related_name="marks")
    mark = models.DecimalField(decimal_places=2, max_digits=5)

    class Meta:
        unique_together = ('student', 'exam')



class Attendance(models.Model):
    id = models.SmallAutoField(primary_key=True)
    student = models.ForeignKey('Student', on_delete=models.CASCADE, null=True, related_name="attendances")
    semester = models.CharField(max_length=1)
    percentage = models.DecimalField(decimal_places=2, max_digits=5)

    class Meta:
        unique_together = ('student', 'semester')
