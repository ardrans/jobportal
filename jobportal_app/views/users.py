from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from ..serializers import UsersSerializer
from ..models import Users
import hashlib

class Register(generics.CreateAPIView):
    serializer_class = UsersSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        hashed_password = hashlib.md5(password.encode()).hexdigest()

        if Users.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        data_with_hashed_password = request.data.copy()
        data_with_hashed_password['password'] = hashed_password

        serializer = self.get_serializer(data=data_with_hashed_password)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)