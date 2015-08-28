# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0014_slide_center'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='slide',
            name='image',
        ),
    ]
