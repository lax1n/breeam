from django.db import models
from mptt.models import MPTTModel, TreeForeignKey

# Create your models here.


class Value(models.Model):
    timeline_size = models.IntegerField(max_length=100, blank=True, null=True)
    macro_column_value = models.IntegerField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.timeline_size


class Setting(models.Model):
    name = models.CharField(max_length=70, blank=True, null=True)
    site_name = models.CharField(max_length=255, blank=True, null=True)
    site_title = models.CharField(max_length=255, blank=True, null=True)
    timeline_and_macro_objects = models.ForeignKey(Value, null=True, default=1)

    def __str__(self):
        return self.name


class Template(models.Model):
    name = models.CharField(max_length=70, blank=True, null=True)
    file_name = models.CharField(max_length=100, blank=True, null=True)
    headers = models.IntegerField(blank=True, null=True, default=0)
    images = models.IntegerField(blank=True, null=True, default=1)

    def __str__(self):
        return self.name


class Decor(models.Model):
    name = models.CharField(max_length=200, blank=True, null=True)
    top_image_1 = models.FileField(upload_to='images/decor/')
    top_image_2 = models.FileField(upload_to='images/decor/')
    top_image_3 = models.FileField(upload_to='images/decor/')
    bottom_image_1 = models.FileField(upload_to='images/decor/')
    bottom_image_2 = models.FileField(upload_to='images/decor/')

    def __str__(self):
        return self.name


class Slide(MPTTModel):
    title = models.CharField(max_length=70, unique=True, null=False)
    center = models.BooleanField(default=False, blank=True)
    align_title_in_image = models.BooleanField(default=False, blank=True)
    slug = models.SlugField(unique=True) #Used to access slides and if url is needed then it will be used to give a SEO friendly URL
    decor = models.ForeignKey(Decor, null=True, blank=True, default=1)
    template = models.ForeignKey(Template, null=True, default=1)
    parent = TreeForeignKey('self', null=True, blank=True, related_name='children', db_index=True)

    def __str__(self):
        return self.title


class SlideButton(models.Model):
    slide = models.ForeignKey(Slide)
    name = models.CharField(max_length=40, unique=False)
    url = models.URLField(max_length=100, unique=False)


class SlideHeader(models.Model):
    slide = models.ForeignKey(Slide)
    header = models.CharField(max_length=50, unique=False)
    url = models.URLField(blank=True) # If header should have a link to it

    class Meta:
        ordering = ['pk']


class SlideImage(models.Model):
    slide = models.ForeignKey(Slide)
    image = models.FileField(upload_to='images/slide_images/', default='images/slide_images/default.jpg')
    description = models.TextField(blank=True) # For alt text
    url = models.URLField(blank=True) # If image should have a link to it

    class Meta:
        ordering = ['pk']
