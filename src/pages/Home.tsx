
import { useEffect } from "react";
import { AlertStatus } from "@/components/AlertStatus";
import { AlertHistory } from "@/components/AlertHistory";
import { SystemInfo } from "@/components/SystemInfo";
import { useAlert } from "@/contexts/AlertContext";
import { Header } from "@/components/Header";
import { AlertTriangle } from "lucide-react";

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
            
            <AlertHistory history={threatHistory} />
            
            <SystemInfo />
          </>
        )}
      </main>
    </div>
  );
}
