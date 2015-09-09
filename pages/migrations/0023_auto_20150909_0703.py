# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0022_auto_20150908_2232'),
    ]

    operations = [
        migrations.AlterField(
            model_name='value',
            name='macro_column_value',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='value',
            name='timeline_size',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
