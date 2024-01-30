from django.urls import path
from .views import users, job_lists, job_applied

urlpatterns = [
    path('register/', users.Register.as_view(), name='register'),
    path('login/', users.Login.as_view(), name='login'),
    path('add_jobs/', job_lists.AddJobs.as_view(), name='add_jobs'),
    path('list_jobs/', job_lists.ListJobs.as_view(), name='list_jobs'),
    path('applied_jobs/', job_applied.AppliedJobs.as_view(), name='applied_jobs'),
    path('list_applied_jobs/', job_applied.ListAppliedJobs.as_view(), name='list_applied_jobs'),

]
