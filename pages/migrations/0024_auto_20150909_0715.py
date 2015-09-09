# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0023_auto_20150909_0703'),
    ]

    operations = [
        migrations.RenameField(
            model_name='value',
            old_name='timeline_size',
            new_name='interval',
        ),
    ]
