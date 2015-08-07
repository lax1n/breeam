# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import mptt.fields


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0006_auto_20150806_0251'),
    ]

    operations = [
        migrations.AlterField(
            model_name='slide',
            name='parent',
            field=mptt.fields.TreeForeignKey(to='pages.Slide', null=True, related_name='children', blank=True),
        ),
    ]
