# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0007_auto_20150807_2132'),
    ]

    operations = [
        migrations.AddField(
            model_name='slide',
            name='align_title_in_image',
            field=models.BooleanField(default=False),
        ),
    ]
