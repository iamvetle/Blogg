# Generated by Django 4.2.6 on 2023-10-30 11:32

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0030_alter_post_date_published'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='date_published',
            field=models.DateTimeField(auto_created=datetime.datetime(2023, 10, 30, 11, 32, 53, 66348, tzinfo=datetime.timezone.utc), blank=True, null=True),
        ),
    ]
