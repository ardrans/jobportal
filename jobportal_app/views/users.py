from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from ..serializers import UsersSerializer
from ..models import Users
import hashlib
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.exceptions import AuthenticationFailed

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




class Login(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        try:
            serializer = self.serializer_class(data=request.data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data['user']
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "status": "success",
                "message": "Access token generated successfully.",
                "data": {
                    "access_token": token.key,
                    "expires_in": 3600,
                }

            })
        except AuthenticationFailed as e:
            error_message = "Invalid username or password."
            print(f"Authentication failed: {str(e)}")
            return Response({
                "status": "error",
                "message": error_message,
            }, status=400)