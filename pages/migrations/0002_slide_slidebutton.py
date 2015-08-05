# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import mptt.fields


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Slide',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, verbose_name='ID', primary_key=True)),
                ('title', models.CharField(unique=True, max_length=50)),
                ('slug', models.SlugField(unique=True)),
                ('image', models.ImageField(default='media/images/slide_images/default.png', upload_to='media/images/slide_images/')),
                ('lft', models.PositiveIntegerField(db_index=True, editable=False)),
                ('rght', models.PositiveIntegerField(db_index=True, editable=False)),
                ('tree_id', models.PositiveIntegerField(db_index=True, editable=False)),
                ('level', models.PositiveIntegerField(db_index=True, editable=False)),
                ('parent', mptt.fields.TreeForeignKey(null=True, to='pages.Slide', related_name='children')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='SlideButton',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=20)),
                ('url', models.URLField(max_length=100)),
                ('slide', models.ForeignKey(to='pages.Slide')),
            ],
        ),
    ]
