# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0010_auto_20150826_1053'),
    ]

    operations = [
        migrations.CreateModel(
            name='Template',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('name', models.CharField(null=True, blank=True, max_length=50)),
                ('file_name', models.CharField(null=True, blank=True, max_length=100)),
                ('headers', models.IntegerField(null=True, blank=True, default=0)),
                ('images', models.IntegerField(null=True, blank=True, default=1)),
            ],
        ),
        migrations.AlterField(
            model_name='slide',
            name='template',
            field=models.ForeignKey(null=True, to='pages.Template', blank=True),
        ),
        migrations.DeleteModel(
            name='Templates',
        ),
    ]
