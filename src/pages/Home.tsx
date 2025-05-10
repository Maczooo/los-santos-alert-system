
import { useEffect } from "react";
import { AlertStatus } from "@/components/AlertStatus";
import { AlertHistory } from "@/components/AlertHistory";
import { SystemInfo } from "@/components/SystemInfo";
import { CityMap } from "@/components/CityMap";
import { RecommendationsList } from "@/components/RecommendationsList";
import { useAlert } from "@/contexts/AlertContext";
import { Header } from "@/components/Header";
import { AlertTriangle } from "lucide-react";
import NotificationSubscriber from "@/components/NotificationSubscriber";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { currentThreatLevel, threatHistory, isLoading } = useAlert();

  useEffect(() => {
    document.title = "System Alertów Miejskich - Los Santos";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">System Alertów Miejskich</h1>
          <p className="text-gray-600">
            Aktualne informacje o poziomie zagrożenia w mieście Los Santos
          </p>
          
          {currentThreatLevel && (
            <div className="flex items-center justify-center gap-1 mt-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <p className="text-sm font-medium text-amber-700">
                Uwaga! Aktywny alert
              </p>
            </div>
          )}
          
          <div className="mt-4 flex justify-center gap-2">
            <NotificationSubscriber />
            <Link to="/admin">
              <Button variant="outline">Panel administratora</Button>
            </Link>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Ładowanie danych...</p>
          </div>
        ) : (
          <>
            {currentThreatLevel ? (
              <AlertStatus threatLevel={currentThreatLevel} />
            ) : (
              <div className="text-center py-8 bg-white rounded-lg shadow">
                <p className="text-gray-500">Brak aktywnych alertów</p>
              </div>
            )}
            
            {/* Nowy komponent mapy */}
            <div className="my-8">
              <h2 className="text-xl font-semibold mb-4">Mapa zagrożeń</h2>
              <CityMap />
            </div>
            
            {/* Zalecenia w zależności od zagrożenia */}
            <RecommendationsList />
            
            <AlertHistory history={threatHistory} />
            
            <SystemInfo />
          </>
        )}
      </main>
    </div>
  );
}
