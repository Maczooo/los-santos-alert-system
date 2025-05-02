
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { UpdateAlertForm } from "@/components/UpdateAlertForm";
import { AlertStatus } from "@/components/AlertStatus";
import { useAlert } from "@/contexts/AlertContext";

export default function Admin() {
  const { currentThreatLevel, isLoading } = useAlert();

  useEffect(() => {
    document.title = "Panel Administratora - System Alertów Miejskich";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Panel Administratora</h1>
          <p className="text-gray-600">
            Zarządzaj alertami i poziomem zagrożenia w mieście Los Santos
          </p>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Ładowanie danych...</p>
          </div>
        ) : (
          <>
            {currentThreatLevel && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-3">Aktualny status:</h2>
                <AlertStatus threatLevel={currentThreatLevel} />
              </div>
            )}
            
            <UpdateAlertForm />
          </>
        )}
      </main>
    </div>
  );
}
