from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings



class Users(AbstractUser):

    USER_TYPES = (
        ('job_seeker', 'Job Seeker'),
        ('employer', 'Employer'),
    )

    usertype = models.CharField(max_length=20, choices=USER_TYPES)

    contact_number = models.CharField(max_length=15, null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)

    skills = models.TextField(null=True, blank=True)
    resume = models.FileField(upload_to='resumes/', null=True, blank=True)

    company_name = models.CharField(max_length=100, null=True, blank=True)

    


class JobsLists(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    location = models.CharField(max_length=100)
    posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class JobsApplied(models.Model):
    applicant = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    job = models.ForeignKey(JobsLists, on_delete=models.CASCADE)
    cover_letter = models.TextField()
    resume = models.FileField(upload_to='job_applications/')
    applied_at = models.DateTimeField(auto_now_add=True)




