# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0008_slide_align_title_in_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='SlideHeader',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
                ('header', models.CharField(max_length=20)),
                ('url', models.URLField(blank=True)),
                ('slide', models.ForeignKey(to='pages.Slide')),
            ],
        ),
        migrations.CreateModel(
            name='SlideImage',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
                ('image', models.FileField(default='images/slide_images/default.jpg', upload_to='images/slide_images/')),
                ('description', models.TextField(blank=True)),
                ('url', models.URLField(blank=True)),
                ('slide', models.ForeignKey(to='pages.Slide')),
            ],
        ),
        migrations.CreateModel(
            name='Templates',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
                ('path_to_template', models.FileField(upload_to='templates/slider_layouts/')),
            ],
        ),
        migrations.AddField(
            model_name='slide',
            name='template',
            field=models.ForeignKey(null=True, blank=True, to='pages.Templates'),
        ),
    ]
