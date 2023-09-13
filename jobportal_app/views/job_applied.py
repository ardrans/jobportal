from rest_framework import generics, status
from ..serializers import JobsAppliedSerializer
from ..models import JobsApplied
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class AppliedJobs(generics.CreateAPIView):
    serializer_class = JobsAppliedSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.is_job_seeker:
            serializer.save(applicant=self.request.user)
        else:
            return Response({"detail": "You do not have permission to apply jobs."}, status=status.HTTP_403_FORBIDDEN)