# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0018_auto_20150830_1803'),
    ]

    operations = [
        migrations.AlterField(
            model_name='slide',
            name='decor',
            field=models.ForeignKey(to='pages.Decor', blank=True, null=True, default=1),
        ),
    ]
