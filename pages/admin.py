from django.contrib import admin
from mptt.admin import MPTTModelAdmin
from pages.models import Slide, SlideButton, SlideHeader, SlideImage, Template, Decor, Setting
from django.conf.urls import url, patterns
from django.shortcuts import redirect
from django.utils.safestring import mark_safe
from django.core.urlresolvers import reverse

# Register your models here.


class SlideButtonInline(admin.TabularInline):
    model = SlideButton
    extra = 0
    max_num = 6


class SlideHeaderInline(admin.TabularInline):
    model = SlideHeader

    def get_extra(self, request, obj=None, **kwargs):
        extra = 0
        if obj:
            extra = obj.template.headers - obj.slideheader_set.count()
        return extra

    def get_max_num(self, request, obj=None, **kwargs):
        if obj:
            return obj.template.headers


class SlideImageInline(admin.TabularInline):
    model = SlideImage

    def get_extra(self, request, obj=None, **kwargs):
        extra = 1
        if obj:
            extra = obj.template.images - obj.slideimage_set.count()
        return extra

    def get_max_num(self, request, obj=None, **kwargs):
        if obj:
            return obj.template.images


class SlideAdmin(MPTTModelAdmin, admin.ModelAdmin):
    list_display = ('title', 'position')
    list_editable = ('title',)
    fieldsets = [
        ('Title', {
            'fields': [('title', 'center', 'align_title_in_image'), 'slug']
        }),
        (None, {
            'fields': ['decor', 'template']
        }),
        ('Advanced', {
            'classes': ('collapse',),
            'fields': ('parent',)
        })
    ]
    prepopulated_fields = {'slug': ('title',)}
    inlines = [SlideHeaderInline, SlideImageInline, SlideButtonInline]

    class Media:
        js = (
            '//code.jquery.com/jquery-1.11.3.min.js',
            '//code.jquery.com/jquery-migrate-1.2.1.min.js',
            'js/slide_admin.js',
        )

    @property
    def _list_url_args(self):
        return (reverse('admin:index')[:-1], \
                self.model._meta.app_label, \
                self.model._meta.object_name.lower())

    url_args = _list_url_args

    def position(self, obj):
        args = self.url_args + (obj.id,)
        return mark_safe(u"""
        %(spaces)s<a class="arrow" href="%(url_up)s">
        <b>&uarr;</b></a>&nbsp;&nbsp;&nbsp;
        <a class="arrow" href="%(url_down)s"><b>&darr;</b></a>
        """ % {
        'url_up': "%s/%s/%s/up/%d/" % args,
        'url_down': "%s/%s/%s/down/%d/" % args,
        'spaces': '&nbsp;' * obj.level * 3,
        })
    position.allow_tags = True
    position.short_description = 'Change content position'

    # up/down views
    def get_urls(self):
        urls = super(SlideAdmin, self).get_urls()

        additional_urls = patterns('',
            url(r'^up/(\d+)/$', self.move, \
                {'is_up': True}, name="move_up"),
            url(r'^down/(\d+)/$', self.move, \
                {'is_up': False}, name="move_down"))
        return additional_urls + urls

    def move(self, request, obj_id, is_up=False):
        obj = Slide.objects.get(pk=obj_id)
        if not is_up:
            next = obj.get_next_sibling()
            obj.move_to(next, position='right')
        else:
            prev = obj.get_previous_sibling()
            obj.move_to(prev, position='left')

        return redirect("/".join(self.url_args) + '/')


class TemplateAdmin(admin.ModelAdmin):
    list_display = ('name', 'headers', 'images')


class DecorAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {
            'fields': ['name']
        }),
        ('Top Decor', {
            'fields': [('top_image_1', 'top_image_2', 'top_image_3')]
        }),
        ('Bottom Decor', {
            'fields': [('bottom_image_1', 'bottom_image_2')]
        })
    ]


admin.site.register(Slide, SlideAdmin)
admin.site.register(Template, TemplateAdmin)
admin.site.register(Decor, DecorAdmin)
admin.site.register(Setting)
