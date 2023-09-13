from django.urls import path
from .views import users, job_lists

urlpatterns = [
    path('register/', users.Register.as_view(), name='register'),
    path('login/', users.Login.as_view(), name='login'),
    path('add_jobs/', job_lists.AddJobs.as_view(), name='add_jobs'),
    path('list_jobs/', job_lists.ListJobs.as_view(), name='list_jobs'),

]