
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { UpdateAlertForm } from "@/components/UpdateAlertForm";
import { AlertStatus } from "@/components/AlertStatus";
import { RecommendationsManager } from "@/components/RecommendationsManager";
import { useAlert } from "@/contexts/AlertContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Admin() {
  const { currentThreatLevel, isLoading } = useAlert();
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Panel Administratora - System Alertów Miejskich";
    
    // Sprawdź, czy użytkownik jest zalogowany
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        navigate('/login');
      } else {
        setAuthChecked(true);
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Sprawdzanie uprawnień...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Panel Administratora</h1>
            <p className="text-gray-600">
              Zarządzaj alertami i poziomem zagrożenia w mieście Los Santos
            </p>
          </div>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Wyloguj się
          </Button>
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
            
            <Tabs defaultValue="alerts">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="alerts">Zarządzanie alertami</TabsTrigger>
                <TabsTrigger value="recommendations">Zalecenia bezpieczeństwa</TabsTrigger>
              </TabsList>
              
              <TabsContent value="alerts">
                <UpdateAlertForm />
              </TabsContent>
              
              <TabsContent value="recommendations">
                <RecommendationsManager />
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  );
}
