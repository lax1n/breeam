from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.http import JsonResponse
from pages.models import Slide, Setting
import math


# Create your views here.


def index(request):
    settings = Setting.objects.first()
    first_slide = Slide.objects.first
    interval = 6 #settings.timeline_and_macro_objects.interval
    site_name = settings.site_name
    site_title = settings.site_title
    macro_views = math.ceil(Slide.objects.count()/interval)
    return render_to_response("index.html",
                              {'site_name': site_name,
                               'site_title': site_title,
                               'slide': first_slide,
                               'timeline_objects': Slide.objects.all()[:interval],
                               'interval': interval,
                               'macro_views': macro_views,
                               'macro_pages': list(range(macro_views))},
                              context_instance=RequestContext(request))


def timeline(request, start, end):
    if int(start) < 0: start = 0
    #return JsonResponse(dict(values=list(Slide.objects.all()[int(start)-1:int(end)].values('slug'))))
    return render_to_response("includes/timeline.html",
                              {'timeline_objects': Slide.objects.all()[int(start):int(end)]},
                              context_instance=RequestContext(request))


def macro(request, start, end):
    if int(start) < 0: start = 0
    #Calculate column value based on number from settings
    column_value = 3
    return render_to_response("macro.html",
                              {'slides': Slide.objects.all()[int(start):int(end)],
                               'column_value': column_value},
                              context_instance=RequestContext(request))


def macro_friendly_slide(request, slug):
    slide = get_object_or_404(Slide, slug=slug)
    template = slide.template.file_name
    return render_to_response("slider_layouts/macro/" + template + ".html",
                              {'slide': slide},
                              context_instance=RequestContext(request))


def show_slide(request, slug):
    slide = get_object_or_404(Slide, slug=slug)
    template = slide.template.file_name
    return render_to_response("slider_layouts/" + template + ".html",
                              {'slide': slide,
                               'slide_prev': slide.get_previous_sibling,
                               'slide_next': slide.get_next_sibling,
                               'siblings': slide.get_siblings(include_self=True),
                               'buttons': slide.slidebutton_set.all},
                              context_instance=RequestContext(request))


def slide_json(request, slug):
    slide = get_object_or_404(Slide, slug=slug)
    return JsonResponse({
        'title': slide.title,
        'align_title_in_image': slide.align_title_in_image,
        'image_src': slide.image.url
    })


def show_buttons(request, slug):
    slide = get_object_or_404(Slide, slug=slug)
    return render_to_response("includes/buttons.html",
                              {'buttons': slide.slidebutton_set.all},
                              context_instance=RequestContext(request))

