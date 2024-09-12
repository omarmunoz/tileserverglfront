
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import map_data_view, style_view, map_data_json,map_data_font,map_data_hillshade,map_data_contours
router = DefaultRouter()

urlpatterns = [
    path('api/', include(router.urls)),
    path('data/<str:archivo>.json', map_data_json),
    path('fonts/<str:fontstack>/<str:range>.pbf', map_data_font),
    path('data/v3/<int:z>/<int:x>/<int:y>.pbf', map_data_view),
    path('data/contours/<int:z>/<int:x>/<int:y>.pbf', map_data_contours),
    path('styles/topografico/style.json', style_view),
    path('data/hillshade/<int:z>/<int:x>/<int:y>.png', map_data_hillshade),
]
