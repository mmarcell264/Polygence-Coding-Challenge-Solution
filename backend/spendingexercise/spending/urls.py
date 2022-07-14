from django.urls import path
from .views import SpendingList

app_name = 'spending'

urlpatterns = [
    path('spendings', SpendingList.as_view(), name="spendings"),
]