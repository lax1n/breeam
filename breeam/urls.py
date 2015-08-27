"""breeam URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^admin/logout/$', 'django.contrib.auth.views.logout', {'next_page': 'pages.views.index'}),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'pages.views.index'),
    url(r'^macro/(?P<start>\d+)/(?P<end>\d+)/$', 'pages.views.macro'),
    url(r'^pages/(?P<slug>[^\.]+)/buttons', 'pages.views.show_buttons'),
    url(r'^pages/(?P<slug>[^\.]+)/json', 'pages.views.slide_json'),
    url(r'^pages/(?P<slug>[^\.]+)/$', 'pages.views.show_slide'),
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
]