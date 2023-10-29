# Generated by Django 4.2.6 on 2023-10-27 19:31

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_customuser_profile_picture_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='age',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='last_online',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='nickname',
        ),
        migrations.AddField(
            model_name='customuser',
            name='bio',
            field=models.TextField(blank=True, max_length=500),
        ),
        migrations.AddField(
            model_name='customuser',
            name='city',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AddField(
            model_name='customuser',
            name='country',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AddField(
            model_name='customuser',
            name='date_joined',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='customuser',
            name='date_of_birth',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='customuser',
            name='gender',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AddField(
            model_name='customuser',
            name='postal_code',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AddField(
            model_name='customuser',
            name='state',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='address',
            field=models.TextField(blank=True, default=None, max_length=500),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='first_name',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='last_login',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='last_name',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='username',
            field=models.CharField(max_length=30, unique=True),
        ),
    ]