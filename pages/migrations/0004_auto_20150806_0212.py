# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0003_auto_20150806_0158'),
    ]

    operations = [
        migrations.AlterField(
            model_name='slide',
            name='image',
            field=models.FileField(default='media/images/slide_images/default.png', upload_to='media/images/slide_images/'),
        ),
    ]
