from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.http import JsonResponse
from pages.models import Slide
import math


# Create your views here.


def index(request):
    first_slide = Slide.objects.first
    return render_to_response("index.html",
                              {'slides': Slide.objects.all,
                               'slide': first_slide,
                               'siblings': Slide.objects.all,
                               'macro_pages': list(range(math.ceil(Slide.objects.count()/12)))},
                              context_instance=RequestContext(request))


def macro(request, start, end):
    return render_to_response("macro.html",
                              {'slides': Slide.objects.all()[int(start)-1:int(end)]},
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

