# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0016_auto_20150828_1221'),
    ]

    operations = [
        migrations.AlterField(
            model_name='slide',
            name='title',
            field=models.CharField(unique=True, max_length=70),
        ),
        migrations.AlterField(
            model_name='slidebutton',
            name='name',
            field=models.CharField(max_length=40),
        ),
        migrations.AlterField(
            model_name='slideheader',
            name='header',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='template',
            name='name',
            field=models.CharField(max_length=70, blank=True, null=True),
        ),
    ]
