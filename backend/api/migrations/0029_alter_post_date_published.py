# Generated by Django 4.2.6 on 2023-10-27 20:19

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0028_alter_post_date_published'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='date_published',
            field=models.DateTimeField(auto_created=datetime.datetime(2023, 10, 27, 20, 19, 24, 753680, tzinfo=datetime.timezone.utc), blank=True, null=True),
        ),
    ]