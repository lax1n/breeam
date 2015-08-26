from django.contrib import admin
from mptt.admin import MPTTModelAdmin
from pages.models import Slide, SlideButton, SlideHeader, SlideImage, Template
from django.conf.urls import url, patterns
from django.shortcuts import redirect
from django.utils.safestring import mark_safe
from django.core.urlresolvers import reverse

# Register your models here.


class SlideButtonInline(admin.StackedInline):
    model = SlideButton
    extra = 0


class SlideHeaderInline(admin.StackedInline):
    model = SlideHeader

    def get_extra(self, request, obj=None, **kwargs):
        extra = 0
        if obj:
            extra = obj.template.headers - obj.slideheader_set.count()
        return extra

    def get_max_num(self, request, obj=None, **kwargs):

        if obj:
            return obj.template.headers
        else:
            return 0


class SlideImageInline(admin.StackedInline):
    model = SlideImage
    extra = 0


class SlideAdmin(MPTTModelAdmin, admin.ModelAdmin):
    list_display = ('title', 'position')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [SlideHeaderInline, SlideImageInline, SlideButtonInline]

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


admin.site.register(Slide, SlideAdmin)
admin.site.register(Template)
