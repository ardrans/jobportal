from django.urls import path
from .views import users

urlpatterns = [
    path('register/', users.Register.as_view(), name='register'),

]