from django.db import models
from mptt.models import MPTTModel, TreeForeignKey

# Create your models here.


class Templates(models.Model):
    path_to_template = models.FileField(upload_to='templates/slider_layouts/')


class Slide(MPTTModel):
    title = models.CharField(max_length=50, unique=True, null=False)
    align_title_in_image = models.BooleanField(default=False, blank=True)
    slug = models.SlugField(unique=True) #Used to access slides and if url is needed then it will be used to give a SEO friendly URL
    template = models.ForeignKey(Templates, blank=True, null=True)
    image = models.FileField(upload_to='images/slide_images/', default='images/slide_images/default.jpg')
    parent = TreeForeignKey('self', null=True, blank=True, related_name='children', db_index=True)

    def __str__(self):
        return self.title


class SlideButton(models.Model):
    slide = models.ForeignKey(Slide)
    name = models.CharField(max_length=20, unique=False)
    url = models.URLField(max_length=100, unique=False)


class SlideHeader(models.Model):
    slide = models.ForeignKey(Slide)
    header = models.CharField(max_length=20, unique=False)
    url = models.URLField(blank=True) # If header should have a link to it


class SlideImage(models.Model):
    slide = models.ForeignKey(Slide)
    image = models.FileField(upload_to='images/slide_images/', default='images/slide_images/default.jpg')
    description = models.TextField(blank=True) # For alt text
    url = models.URLField(blank=True) # If image should have a link to it
