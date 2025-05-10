
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAlert } from '@/contexts/AlertContext';
import { supabase } from '@/integrations/supabase/client';
import { Info, Shield } from 'lucide-react';
import { ThreatCode } from '@/types/alert';

type Recommendation = {
  id: string;
  threat_code: ThreatCode;
  title: string;
  description: string;
};

export function RecommendationsList() {
  const { currentThreatLevel } = useAlert();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentThreatLevel) return;
    
    const fetchRecommendations = async () => {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('threat_recommendations')
        .select('*')
        .eq('threat_code', currentThreatLevel.threat_code);
      
      if (error) {
        console.error('Błąd podczas pobierania zaleceń:', error);
      } else if (data) {
        setRecommendations(data as Recommendation[]);
      }
      
      setIsLoading(false);
    };
    
    fetchRecommendations();
  }, [currentThreatLevel]);

  if (isLoading) {
    return (
      <Card className="border border-gray-200 mb-8">
        <CardHeader className="pb-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Zalecenia bezpieczeństwa
          </h2>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-4">Ładowanie zaleceń...</p>
        </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <Card className="border border-gray-200 mb-8">
      <CardHeader className="pb-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Zalecenia bezpieczeństwa
        </h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div 
              key={rec.id} 
              className="bg-gray-50 border border-gray-100 rounded-lg p-4"
            >
              <h3 className="font-medium flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-blue-500" /> 
                {rec.title}
              </h3>
              <p className="text-gray-700">{rec.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
