# Generated by Django 4.2.4 on 2023-08-12 22:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_customuser_is_staff'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='is_superuser',
            field=models.BooleanField(verbose_name=False),
        ),
    ]
