# Generated by Django 4.1.7 on 2023-04-27 04:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("EduTracker", "0005_alter_mark_mark"),
    ]

    operations = [
        migrations.AlterField(
            model_name="attendance",
            name="student",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="attendances",
                to="EduTracker.student",
            ),
        ),
        migrations.AlterField(
            model_name="exam",
            name="subject",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="exams",
                to="EduTracker.subject",
            ),
        ),
        migrations.AlterField(
            model_name="mark",
            name="exam",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="marks",
                to="EduTracker.exam",
            ),
        ),
        migrations.AlterField(
            model_name="mark",
            name="student",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="marks",
                to="EduTracker.student",
            ),
        ),
        migrations.AlterField(
            model_name="student",
            name="mentor",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="mentee",
                to="EduTracker.teacher",
            ),
        ),
        migrations.AlterField(
            model_name="teacher",
            name="subject",
            field=models.OneToOneField(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="teacher",
                to="EduTracker.subject",
            ),
        ),
    ]
