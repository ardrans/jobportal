from rest_framework import serializers
from .models import Users, JobsLists, JobsApplied

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'


# class JobsListsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = JobsLists
#         fields = '__all__'

class JobsAppliedSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobsApplied
        fields = '__all__'


class JobsListsSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobsLists
        fields = ['id', 'title', 'description', 'location', 'posted_by', 'created_at', 'updated_at']
        read_only_fields = ['posted_by']




