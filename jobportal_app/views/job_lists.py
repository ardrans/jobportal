from rest_framework import generics, status
from ..serializers import JobsListsSerializer
from ..models import JobsLists
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.filters import SearchFilter


class AddJobs(generics.CreateAPIView):
    serializer_class = JobsListsSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        print('hi inserting')
        print(user.usertype)
        if user.usertype == 'employer':
            print('hi inserting to')
            serializer.save(posted_by=user)
        else:
            print('not inserting')
            raise PermissionDenied("You do not have permission to create jobs.")
            #return Response({"detail": "You do not have permission to create jobs."}, status=status.HTTP_403_FORBIDDEN)



# class ListJobs(generics.ListAPIView):
#     queryset = JobsLists.objects.all()
#     serializer_class = JobsListsSerializer
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]


class ListJobs(generics.ListAPIView):
    queryset = JobsLists.objects.all()
    serializer_class = JobsListsSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [SearchFilter]
    search_fields = ['location']

    def get_queryset(self):
        queryset = super().get_queryset()
        location = self.request.query_params.get('location', None)
        if location is not None:
            queryset = queryset.filter(location__icontains=location)
        return queryset

