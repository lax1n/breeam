# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0013_auto_20150826_1110'),
    ]

    operations = [
        migrations.AddField(
            model_name='slide',
            name='center',
            field=models.BooleanField(default=False),
        ),
    ]
