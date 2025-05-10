
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '@/components/ui/card';
import { useAlert } from '@/contexts/AlertContext';
import { supabase } from '@/integrations/supabase/client';

// Usunięcie domyślnych markerów Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Współrzędne mapy Los Santos (przybliżone)
const LS_CENTER = [34.052235, -118.243683];
const DEFAULT_ZOOM = 12;

type District = {
  id: string;
  name: string;
  code: string;
  coordinates: {
    lat: number;
    lng: number;
    radius: number;
  };
};

export function CityMap() {
  const { currentThreatLevel } = useAlert();
  const [map, setMap] = useState<L.Map | null>(null);
  const [districts, setDistricts] = useState<District[]>([]);
  const [districtLayers, setDistrictLayers] = useState<L.Circle[]>([]);

  // Pobieranie dzielnic z bazy danych
  useEffect(() => {
    const fetchDistricts = async () => {
      const { data, error } = await supabase
        .from('city_districts')
        .select('*');
      
      if (error) {
        console.error('Błąd podczas pobierania dzielnic:', error);
        return;
      }
      
      if (data) {
        setDistricts(data as District[]);
      }
    };
    
    fetchDistricts();
  }, []);

  // Inicjalizacja mapy
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mapContainer = document.getElementById('map');
      
      if (!mapContainer || map) return;
      
      const newMap = L.map('map').setView(LS_CENTER, DEFAULT_ZOOM);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(newMap);
      
      setMap(newMap);
      
      return () => {
        newMap.remove();
      };
    }
  }, [map]);

  // Aktualizacja kolorów dzielnic w zależności od poziomu zagrożenia
  useEffect(() => {
    if (!map || districts.length === 0) return;
    
    // Usuń poprzednie warstwy
    districtLayers.forEach(layer => map.removeLayer(layer));
    
    // Kolor zagrożenia
    const threatColor = currentThreatLevel ? 
      currentThreatLevel.threat_code === 'green' ? '#4ade80' :
      currentThreatLevel.threat_code === 'orange' ? '#fb923c' :
      currentThreatLevel.threat_code === 'red' ? '#ea384c' : 
      currentThreatLevel.threat_code === 'black' ? '#000000' : 
      '#4ade80' : '#4ade80';
    
    // Dodaj nowe warstwy
    const newLayers = districts.map(district => {
      const { lat, lng, radius } = district.coordinates;
      const circle = L.circle([lat, lng], {
        color: threatColor,
        fillColor: threatColor,
        fillOpacity: 0.3,
        radius: radius
      }).addTo(map);
      
      // Dodaj popup z informacją o dzielnicy
      circle.bindPopup(`<b>${district.name}</b><br>Status: ${currentThreatLevel?.threat_code || 'brak zagrożeń'}`);
      
      return circle;
    });
    
    setDistrictLayers(newLayers);
  }, [map, districts, currentThreatLevel]);

  return (
    <Card className="border border-gray-200 overflow-hidden">
      <div id="map" className="h-[400px] w-full"></div>
    </Card>
  );
}
