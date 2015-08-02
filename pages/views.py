from django.shortcuts import render_to_response
from django.template import RequestContext
from pages.models import Genre

# Create your views here.


def show_genres(request):
    return render_to_response("genres.html",
                              {'nodes': Genre.objects.all()},
                              context_instance=RequestContext(request))
