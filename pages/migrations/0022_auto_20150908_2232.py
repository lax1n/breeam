# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0021_auto_20150831_1143'),
    ]

    operations = [
        migrations.CreateModel(
            name='Setting',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, verbose_name='ID', serialize=False)),
                ('name', models.CharField(blank=True, max_length=70, null=True)),
                ('site_name', models.CharField(blank=True, max_length=255, null=True)),
                ('site_title', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Value',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, verbose_name='ID', serialize=False)),
                ('timeline_size', models.IntegerField(blank=True, max_length=100, null=True)),
                ('macro_column_value', models.IntegerField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='setting',
            name='timeline_and_macro_objects',
            field=models.ForeignKey(to='pages.Value', null=True, default=1),
        ),
    ]
