from django.contrib import admin
from django.template.response import TemplateResponse
from django.urls import path
from django.utils.safestring import mark_safe
from django import forms
from .models import Post, Room, Comment, RoomSubmit, User
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from . import dao


class RentAppAdminSite(admin.AdminSite):
    site_header = 'App Thuê Nhà Giá Rẻ'

    def get_urls(self):
        return [
            path('room-stats/', self.stats_view)
        ] + super().get_urls()

    def stats_view(self, request):
        return TemplateResponse(request, 'admin/stats.html', {
            'stats': dao.count_rooms_by_post()
        })  # path cua view tra ve


admin_site = RentAppAdminSite(name='rent_app')


class PostForm(forms.ModelForm):
    body = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Post
        fields = '__all__'


class PostAdmin(admin.ModelAdmin):
    forms = PostForm
    list_display = ['pk', 'title']
    search_fields = ['title']
    list_filter = ['id', 'title']


class RoomAdmin(admin.ModelAdmin):
    readonly_fields = ['img']

    def img(self, room):
        if room:
            return mark_safe(
                '<img src="/static/{url}" width="120" />' \
                    .format(url=room.image.name)
            )

    class Media:
        css ={
            'all': ('/static/css/style.css',)
        }


admin_site.register(Post, PostAdmin)
admin_site.register(Room, RoomAdmin)
admin_site.register(Comment)
admin_site.register(RoomSubmit)
admin_site.register(User)
