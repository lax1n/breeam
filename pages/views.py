from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.http import JsonResponse
from pages.models import Slide
from django.core import serializers


# Create your views here.


def index(request):
    return render_to_response("index.html",
                              {'slides': Slide.objects.all,
                               'first_slide': Slide.objects.first,
                               'siblings': Slide.objects.all},
                              context_instance=RequestContext(request))


def show_slide(request, slug):
    slide = get_object_or_404(Slide, slug=slug)
    return render_to_response("layouts/slide.html",
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

