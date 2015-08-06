# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0002_slide_slidebutton'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='genre',
            name='parent',
        ),
        migrations.DeleteModel(
            name='Genre',
        ),
    ]
