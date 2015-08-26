# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0011_auto_20150826_1055'),
    ]

    operations = [
        migrations.AlterField(
            model_name='slide',
            name='template',
            field=models.ForeignKey(to='pages.Template', default=0, blank=True, null=True),
        ),
    ]
