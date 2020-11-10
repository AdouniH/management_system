from django.urls import path
from calendar_app.views import CalendarView, ShotPicker, TeamsLInkPicker, RdvView


urlpatterns = [
    path('', CalendarView.as_view(), name="calendar"),
    path('<int:creneau_id>', ShotPicker.as_view(), name="shotpicker"),
    path('team', TeamsLInkPicker.as_view(), name="teams"),
    path('rdv', RdvView.as_view(), name="rdv"),
]
