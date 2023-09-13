from rest_framework import generics, status
from ..serializers import JobsListsSerializer
from ..models import JobsLists
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import redirect

class AddJobs(generics.CreateAPIView):
    serializer_class = JobsListsSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.is_employer:
            serializer.save(posted_by=self.request.user)
        else:
            return Response({"detail": "You do not have permission to create jobs."}, status=status.HTTP_403_FORBIDDEN)


class ListJobs(generics.ListAPIView):
    serializer_class = JobsListsSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
