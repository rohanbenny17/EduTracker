from rest_framework import serializers
from EduTracker.models import User, Student, Teacher, Subject, Exam, Mark, Attendance
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'phone_no', 'dob']


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'phone_no', 'dob', 'subject']

    @classmethod
    def serialize_foreign_keys(cls, serializer, args):
        if 'subject' in args:
            serializer.fields['subject'] = SubjectSerializer()

    # Custom Serializer Method to Dynamically Serialize Foreign Key Fields
    def __init__(self, *args, **kwargs):
        fields_to_serialize = kwargs.pop('args', None)
        super().__init__(*args, **kwargs)

        if fields_to_serialize:
            self.serialize_foreign_keys(self, fields_to_serialize)
            

class StudentSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Student
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'phone_no', 'dob', 'year_of_admission', 'mentor', 'password']

    @classmethod
    def serialize_foreign_keys(cls, serializer, args):
        if 'mentor' in args:
            serializer.fields['mentor'] = TeacherSerializer()

    # Custom Serializer Method to Dynamically Serialize Foreign Key Fields
    def __init__(self, *args, **kwargs):
        fields_to_serialize = kwargs.pop('args', None)
        super().__init__(*args, **kwargs)

        if fields_to_serialize:
            self.serialize_foreign_keys(self, fields_to_serialize)

    def create(self, validated_data):
        password = validated_data.pop('password')
        hashed_password = make_password(password)
        student = Student.objects.create(password=hashed_password, **validated_data)
        return student


class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'

    @classmethod
    def serialize_foreign_keys(cls, serializer, args):
        if 'subject' in args:
            serializer.fields['subject'] = SubjectSerializer()

    # Custom Serializer Method to Dynamically Serialize Foreign Key Fields
    def __init__(self, *args, **kwargs):
        fields_to_serialize = kwargs.pop('args', None)
        super().__init__(*args, **kwargs)

        if fields_to_serialize:
            self.serialize_foreign_keys(self, fields_to_serialize)
            

class MarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = '__all__'

    @classmethod
    def serialize_foreign_keys(cls, serializer, args):
        if 'student' in args:
            serializer.fields['student'] = StudentSerializer()
        if 'exam' in args:
            if 'subject' in args:
                serializer.fields['exam'] = ExamSerializer(args=['subject'])
            else:
                serializer.fields['exam'] = ExamSerializer()

    # Custom Serializer Method to Dynamically Serialize Foreign Key Fields
    def __init__(self, *args, **kwargs):
        fields_to_serialize = kwargs.pop('args', None)
        super().__init__(*args, **kwargs)

        if fields_to_serialize:
            self.serialize_foreign_keys(self, fields_to_serialize)
            

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

    @classmethod
    def serialize_foreign_keys(cls, serializer, args):
        if 'student' in args:
            serializer.fields['student'] = StudentSerializer()


    # Custom Serializer Method to Dynamically Serialize Foreign Key Fields
    def __init__(self, *args, **kwargs):
        fields_to_serialize = kwargs.pop('args', None)
        super().__init__(*args, **kwargs)

        if fields_to_serialize:
            self.serialize_foreign_keys(self, fields_to_serialize)

