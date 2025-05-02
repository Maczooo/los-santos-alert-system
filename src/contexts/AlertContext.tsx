
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThreatLevel, ThreatCode, threatLevelsInfo } from '@/types/alert';
import { getCurrentThreatLevel, updateThreatLevel, subscribeToThreatLevels, getThreatLevelHistory } from '@/lib/supabase';
import { useToast } from "@/hooks/use-toast";

interface AlertContextType {
  currentThreatLevel: ThreatLevel | null;
  threatHistory: ThreatLevel[];
  isLoading: boolean;
  updateAlert: (threatCode: ThreatCode, message?: string) => Promise<void>;
  formatDate: (dateStr: string) => string;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [currentThreatLevel, setCurrentThreatLevel] = useState<ThreatLevel | null>(null);
  const [threatHistory, setThreatHistory] = useState<ThreatLevel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Załadowanie danych początkowych
  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);
      try {
        const [currentLevel, history] = await Promise.all([
          getCurrentThreatLevel(),
          getThreatLevelHistory(5)
        ]);
        setCurrentThreatLevel(currentLevel);
        setThreatHistory(history);
      } catch (error) {
        console.error('Failed to load initial data:', error);
        toast({
          title: "Błąd podczas ładowania danych",
          description: "Nie udało się pobrać aktualnego poziomu zagrożenia",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialData();
  }, [toast]);

  // Subskrypcja na zmiany w czasie rzeczywistym
  useEffect(() => {
    const subscription = subscribeToThreatLevels(async (payload) => {
      // Aktualizacja aktualnego poziomu zagrożenia
      if (payload.new) {
        setCurrentThreatLevel(payload.new as ThreatLevel);
        
        // Aktualizacja historii
        const history = await getThreatLevelHistory(5);
        setThreatHistory(history);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Funkcja aktualizacji alertu
  const updateAlert = async (threatCode: ThreatCode, message?: string) => {
    setIsLoading(true);
    try {
      const updatedLevel = await updateThreatLevel(threatCode, message);
      if (updatedLevel) {
        setCurrentThreatLevel(updatedLevel);
        const history = await getThreatLevelHistory(5);
        setThreatHistory(history);
        
        toast({
          title: "Aktualizacja kodu zagrożenia",
          description: `Kod zagrożenia został zmieniony na ${threatLevelsInfo[threatCode].name}`,
        });
      }
    } catch (error) {
      console.error('Failed to update threat level:', error);
      toast({
        title: "Błąd aktualizacji",
        description: "Nie udało się zaktualizować kodu zagrożenia",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Pomocnicza funkcja formatowania daty
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const value = {
    currentThreatLevel,
    threatHistory,
    isLoading,
    updateAlert,
    formatDate
  };

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}
