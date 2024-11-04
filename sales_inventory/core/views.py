from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from .models import Product, Customer, Order, OrderItem, User
from .serializers import ProductSerializer, CustomerSerializer, OrderSerializer, OrderItemSerializer, UserSerializer

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.auth.models import AbstractUser
from django.db import models

import logging

logger = logging.getLogger(__name__)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

class RegisterUserView(APIView):
    def post(self, request):
        #print(request.data)
        username = request.data.get('username')
        password = request.data.get('password')
        role = request.data.get('role', 'customer')  # Podrazumijevano je 'customer'

        serializer = UserSerializer(data={'username': username, 'password': password, 'role': role})
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': serializer.data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Dodajte dodatne informacije u token, ako je potrebno
        token['role'] = user.role  # Na primjer, dodavanje uloge

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    def post(self, request, *args, **kwargs):
        logger.info(f'Login attempt with username: {request.data.get("username")} password: {request.data.get("password")}')
        response = super().post(request, *args, **kwargs)
        logger.info(f'Response status: {response.status_code} Data: {response.data}')
        return response

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_product(request):
    # Provjera je li korisnik admin
    if request.user.role != 'admin':
        return Response({'error': 'Access denied'}, status=status.HTTP_403_FORBIDDEN)

    # Ako je korisnik admin, dopuštamo dodavanje proizvoda
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)