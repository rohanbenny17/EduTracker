from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from EduTracker.models import Student, Teacher, Exam, Mark, Attendance
from .serializers import StudentSerializer, MarkSerializer, AttendanceSerializer, TeacherSerializer
from django.db import IntegrityError
from django.contrib.auth.hashers import make_password, check_password


@api_view(['GET', 'POST'])
def get_all_students(request):
    if request.method == "GET":
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True, args=['mentor'])
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == "POST":
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PATCH', 'PUT', 'DELETE'])
def get_one_student(request, id):
    try:
        student = Student.objects.get(id=id)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = StudentSerializer(student, many=False, args=['mentor'])
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'PATCH':
        serializer = StudentSerializer(instance=student, data=request.data, partial=True, args=['mentor'])
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'PUT':
        serializer = StudentSerializer(instance=student, data=request.data, partial=True, args=['mentor'])
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
@api_view(['GET', 'PUT', 'DELETE'])
def get_one_mark(request, id):
    if request.method == 'GET':
        try:
            student = Student.objects.get(id=id)
        except Student.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        marks = student.marks
        serializer = MarkSerializer(marks, many=True, args=['exam', 'subject'])
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    else:
        try:
            mark = Mark.objects.get(id=id)
        except Mark.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        if request.method == 'PUT':
            markvalue = request.data.get('mark')
            mark.mark = markvalue
            mark.save()

            return Response(status=status.HTTP_204_NO_CONTENT)
        
        elif request.method == 'DELETE':
            mark.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def get_one_attendance(request, id):
    
    try:
        student = Student.objects.get(id=id)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        attendance = student.attendances
        serializer = AttendanceSerializer(attendance, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        sem = request.data.get('sem')
        percentage = request.data.get('attendance')

        try:
            attendance = Attendance.objects.get(student=student, semester=sem)
        except Attendance.DoesNotExist:
            Attendance.objects.create(student=student, semester=sem, percentage=percentage)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            attendance.percentage = percentage
            attendance.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PATCH'])
def get_one_teacher(request, id):
    try:
        teacher = Teacher.objects.get(id=id)
    except Teacher.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = TeacherSerializer(teacher, many=False, args=['subject'])
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'PATCH':
        serializer = StudentSerializer(instance=teacher, data=request.data, partial=True, args=['subject'])
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_all_mentee(request, id):
    try:
        teacher = Teacher.objects.get(id=id)
    except Teacher.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    mentees = teacher.mentee.all()
    serializer = StudentSerializer(mentees, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def get_exam_mark(request, id, semester, term):
    try:
        teacher = Teacher.objects.get(id=id)
        sub = teacher.subject
        exam = Exam.objects.get(semester=semester, number=term, subject=sub)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        marks = exam.marks.all()
        serializer = MarkSerializer(marks, many=True, args=['student'])
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        try:
            student_id = request.data.get('studentId')
            student = Student.objects.get(id=student_id)
            mark = request.data.get('mark')
            Mark.objects.create(student=student, exam=exam, mark=mark)
        except IntegrityError:
            return Response(status=status.HTTP_409_CONFLICT)
        
        return Response(status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_sem_attendance(request, id, semester):
    try:
        student = Student.objects.get(id=id)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    try:
        attendance = Attendance.objects.get(student=student, semester=semester)
    except Attendance.DoesNotExist:
        attendance = Attendance.objects.create(student=student, semester=semester, percentage=0.00)
    finally:
        serializer = AttendanceSerializer(attendance, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['PUT'])
def teacher_password(request, id):
    try:
        teacher = Teacher.objects.get(id=id)
    except Teacher.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    old = request.data.get('oldPass')
    new = request.data.get('newPass')
    
    if not check_password(old, teacher.password):
        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
    
    new_hashed = make_password(new)

    teacher.password = new_hashed
    teacher.save()

    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT'])
def student_password(request, id):
    try:
        student = Student.objects.get(id=id)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    old = request.data.get('oldPass')
    new = request.data.get('newPass')
    
    if not check_password(old, student.password):
        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
    
    new_hashed = make_password(new)

    student.password = new_hashed
    student.save()

    return Response(status=status.HTTP_204_NO_CONTENT)

