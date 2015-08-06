# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0005_auto_20150806_0215'),
    ]

    operations = [
        migrations.AlterField(
            model_name='slide',
            name='image',
            field=models.FileField(upload_to='images/slide_images/', default='images/slide_images/default.jpg'),
        ),
    ]
