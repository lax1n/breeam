# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0020_auto_20150830_1914'),
    ]

    operations = [
        migrations.AlterField(
            model_name='slide',
            name='decor',
            field=models.ForeignKey(null=True, blank=True, to='pages.Decor', default=1),
        ),
    ]
