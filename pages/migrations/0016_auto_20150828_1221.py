# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0015_remove_slide_image'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='slideheader',
            options={'ordering': ['pk']},
        ),
        migrations.AlterModelOptions(
            name='slideimage',
            options={'ordering': ['pk']},
        ),
    ]
