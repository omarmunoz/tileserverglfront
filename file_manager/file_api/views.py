# file_api/views.py

from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .serializers import  UserSerializer
from rest_framework import status
from django.http import FileResponse

from django.http import HttpResponse
from django.http import JsonResponse
import requests
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
import jwt
from django.conf import settings
import os
from django.http import HttpResponseRedirect




class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

    @action(detail=False, methods=['post'])
    def create_user(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # @action(detail=False, methods=['post'])
    # def obtain_token(self, request):
    #     username = request.data.get('username')
    #     password = request.data.get('password')

    #     if username and password:
    #         user = authenticate(username=username, password=password)

    #         if user:
    #             token, created = Token.objects.get_or_create(user=user)
    #             return Response({'token': token.key}, status=status.HTTP_200_OK)

    #     return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)



@api_view(['GET'])
# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
def map_data_view(request, z, x, y):
    url = f'http://localhost:8080/data/v3/{z}/{x}/{y}.pbf'
    response = requests.get(url, verify=False)
    return HttpResponse(response.content, content_type='application/octet-stream')



api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def style_view(request):
    token = request.GET.get('access_token')
    if not token:
        raise AuthenticationFailed('Token de acceso requerido')
    try:
        # Verificar el token
        decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
    except jwt.InvalidTokenError:
        raise AuthenticationFailed('Token de acceso inválido')
    # url = 'https://mapas.cedn.mx/styles/basic-preview/style.json'
    # response = requests.get(url, verify=False)
    # data = response.json()  # Parsear los datos a JSON
    # print(data)  # Imprimir los datos
    # return JsonResponse(data)
    style_path = os.path.join(settings.BASE_DIR, 'file_api/static/style.json')
    return FileResponse(open(style_path, 'rb'))


@api_view(['GET'])
def map_data_json(request, archivo):
    style_path = os.path.join(settings.BASE_DIR, f'file_api/static/{archivo}.json')
    return FileResponse(open(style_path, 'rb'))
    

@api_view(['GET'])
# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
def map_data_font(request, fontstack, range):
    url = f'http://localhost:8080/fonts/{fontstack}/{range}.pbf'
    response = requests.get(url, verify=False)
    return HttpResponse(response.content, content_type='application/octet-stream')



@api_view(['GET'])
# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
def map_data_hillshade(request, z, x, y):
    url = f'http://localhost:8080/data/hillshade/{z}/{x}/{y}.png'
    response = requests.get(url, verify=False)
    return HttpResponse(response.content, content_type='image/png')


@api_view(['GET'])
# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
def map_data_contours(request, z, x, y):
    url = f'http://localhost:8080/data/contours/{z}/{x}/{y}.pbf'
    response = requests.get(url, verify=False)
    return HttpResponse(response.content, content_type='application/octet-stream')

