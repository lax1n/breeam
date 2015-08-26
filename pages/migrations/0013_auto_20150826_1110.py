# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0012_auto_20150826_1104'),
    ]

    operations = [
        migrations.AlterField(
            model_name='slide',
            name='template',
            field=models.ForeignKey(to='pages.Template', null=True, default=1),
        ),
    ]
