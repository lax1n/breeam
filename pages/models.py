from django.db import models
from mptt.models import MPTTModel, TreeForeignKey

# Create your models here.


class Slide(MPTTModel):
    title = models.CharField(max_length=50, unique=True, null=False)
    slug = models.SlugField(unique=True)
    image = models.FileField(upload_to='images/slide_images/', default='images/slide_images/default.jpg')
    parent = TreeForeignKey('self', null=True, blank=True, related_name='children', db_index=True)

    def __str__(self):
        return self.title


class SlideButton(models.Model):
    slide = models.ForeignKey(Slide)
    name = models.CharField(max_length=20, unique=False)
    url = models.URLField(max_length=100, unique=False)
