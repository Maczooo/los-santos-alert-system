
import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '@/components/ui/card';
import { useAlert } from '@/contexts/AlertContext';
import { supabase } from '@/integrations/supabase/client';

// Remove default Leaflet markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Los Santos center coordinates (approximate)
const LS_CENTER = [34.052235, -118.243683];
const DEFAULT_ZOOM = 12;

// Define proper District type
type District = {
  id: string;
  name: string;
  code: string;
  coordinates: {
    lat: number;
    lng: number;
    radius: number;
  };
  created_at?: string;
};

export function CityMap() {
  const { currentThreatLevel } = useAlert();
  const [map, setMap] = useState<L.Map | null>(null);
  const [districts, setDistricts] = useState<District[]>([]);
  const [districtLayers, setDistrictLayers] = useState<L.Circle[]>([]);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Fetch districts from the database
  useEffect(() => {
    const fetchDistricts = async () => {
      const { data, error } = await supabase
        .from('city_districts')
        .select('*');
      
      if (error) {
        console.error('Error fetching districts:', error);
        return;
      }
      
      if (data) {
        // Cast data to the proper District type
        const typedDistricts: District[] = data.map(district => ({
          id: district.id,
          name: district.name,
          code: district.code,
          coordinates: district.coordinates as { lat: number; lng: number; radius: number }
        }));
        
        setDistricts(typedDistricts);
      }
    };
    
    fetchDistricts();
  }, []);

  // Initialize map
  useEffect(() => {
    // Only initialize map if mapContainerRef is ready and there's no map yet
    if (mapContainerRef.current && !map) {
      const newMap = L.map(mapContainerRef.current).setView(LS_CENTER, DEFAULT_ZOOM);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(newMap);
      
      setMap(newMap);
      
      // Cleanup function
      return () => {
        newMap.remove();
      };
    }
  }, [map, mapContainerRef]);

  // Update district colors based on threat level
  useEffect(() => {
    if (!map || districts.length === 0) return;
    
    // Remove previous layers
    districtLayers.forEach(layer => map.removeLayer(layer));
    
    // Get threat color
    const threatColor = currentThreatLevel ? 
      currentThreatLevel.threat_code === 'green' ? '#4ade80' :
      currentThreatLevel.threat_code === 'orange' ? '#fb923c' :
      currentThreatLevel.threat_code === 'red' ? '#ea384c' : 
      currentThreatLevel.threat_code === 'black' ? '#000000' : 
      '#4ade80' : '#4ade80';
    
    // Add new layers
    const newLayers = districts.map(district => {
      const { lat, lng, radius } = district.coordinates;
      const circle = L.circle([lat, lng], {
        color: threatColor,
        fillColor: threatColor,
        fillOpacity: 0.3,
        radius: radius
      }).addTo(map);
      
      // Add popup with district info
      circle.bindPopup(`<b>${district.name}</b><br>Status: ${currentThreatLevel?.threat_code || 'brak zagrożeń'}`);
      
      return circle;
    });
    
    setDistrictLayers(newLayers);
  }, [map, districts, currentThreatLevel]);

  return (
    <Card className="border border-gray-200 overflow-hidden">
      <div ref={mapContainerRef} className="h-[400px] w-full"></div>
    </Card>
  );
}
