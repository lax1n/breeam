from django.contrib import admin
from mptt.admin import MPTTModelAdmin
from pages.models import Slide, SlideButton

# Register your models here.


class SlideButtonInline(admin.StackedInline):
    model = SlideButton
    extra = 3


class SlideAdmin(MPTTModelAdmin):
    prepopulated_fields = {'slug': ('title',)}
    inlines = [SlideButtonInline]


admin.site.register(Slide, SlideAdmin)
