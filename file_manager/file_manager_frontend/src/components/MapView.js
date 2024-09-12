import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css'; // Importa los estilos de MapLibre GL JS
import './MapView.css'; // Importa los estilos personalizados

function MapView({ altura }) {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    const mapInstance = new maplibregl.Map({
      container: mapContainer.current,
      center: [-107, 19.451054],
      zoom: 4
    });

    // Agrega controles de navegación al mapa
    mapInstance.addControl(new maplibregl.NavigationControl());

    setMap(mapInstance);

    return () => mapInstance.remove();
  }, []);

  useEffect(() => {
    if (map && token) {
      map.setStyle('https://elmapa.cedn.mx/styles/topografico/style.json?access_token=' + token);
    }
  }, [map, token]);

  return <div ref={mapContainer} style={{ 
    border: '1px solid black', 
    borderRadius: '10px', 
    right: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    height: `calc(100vh  - ${altura}px)`,
  }} />;
}

export default MapView;