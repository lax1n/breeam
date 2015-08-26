# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0009_auto_20150823_1615'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='templates',
            name='path_to_template',
        ),
        migrations.AddField(
            model_name='templates',
            name='file_name',
            field=models.CharField(max_length=100, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='templates',
            name='headers',
            field=models.IntegerField(null=True, blank=True, default=0),
        ),
        migrations.AddField(
            model_name='templates',
            name='images',
            field=models.IntegerField(null=True, blank=True, default=1),
        ),
        migrations.AddField(
            model_name='templates',
            name='name',
            field=models.CharField(max_length=50, null=True, blank=True),
        ),
    ]
