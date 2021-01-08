from django.contrib import admin
from calendar_app.models import Calendar, TeamLink, Rdv, SkypeLink


admin.site.register(Calendar)
admin.site.register(TeamLink)
admin.site.register(Rdv)
admin.site.register(SkypeLink)
