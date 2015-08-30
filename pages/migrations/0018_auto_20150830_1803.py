# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0017_auto_20150828_2220'),
    ]

    operations = [
        migrations.CreateModel(
            name='Decor',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', primary_key=True, auto_created=True)),
                ('name', models.CharField(null=True, max_length=200, blank=True)),
                ('top_image_1', models.FileField(upload_to='images/decor/')),
                ('top_image_2', models.FileField(upload_to='images/decor/')),
                ('top_image_3', models.FileField(upload_to='images/decor/')),
                ('bottom_image_1', models.FileField(upload_to='images/decor/')),
                ('bottom_image_2', models.FileField(upload_to='images/decor/')),
            ],
        ),
        migrations.AddField(
            model_name='slide',
            name='decor',
            field=models.ForeignKey(null=True, blank=True, to='pages.Decor'),
        ),
    ]
