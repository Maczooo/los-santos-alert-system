
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Bell, BellOff } from "lucide-react";

export default function NotificationSubscriber() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Sprawdź, czy przeglądarka wspiera powiadomienia
    if (!('Notification' in window)) {
      console.log('Ta przeglądarka nie obsługuje powiadomień');
      return;
    }

    // Sprawdź, czy użytkownik już zasubskrybował powiadomienia
    const checkSubscription = async () => {
      try {
        if (Notification.permission === 'granted') {
          const sw = await navigator.serviceWorker.ready;
          const subscription = await sw.pushManager.getSubscription();
          setIsSubscribed(!!subscription);
        }
      } catch (error) {
        console.error('Błąd podczas sprawdzania subskrypcji:', error);
      }
    };
    
    checkSubscription();
  }, []);

  const subscribeToNotifications = async () => {
    setIsLoading(true);
    
    try {
      // Prośba o pozwolenie na powiadomienia
      const permission = await Notification.requestPermission();
      
      if (permission !== 'granted') {
        toast({
          title: "Brak uprawnień",
          description: "Aby otrzymywać powiadomienia, musisz wyrazić zgodę",
          variant: "destructive",
        });
        return;
      }
      
      // Rejestracja Service Worker (jeśli nie jest zarejestrowany)
      const sw = await navigator.serviceWorker.ready;
      
      // Pobieranie lub tworzenie subskrypcji
      let subscription = await sw.pushManager.getSubscription();
      
      if (!subscription) {
        // Klucz publiczny VAPID (należy go ustawić w ustawieniach)
        // W prawdziwym projekcie należy użyć prawdziwego klucza VAPID
        const vapidPublicKey = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U';
        
        // Konwersja klucza string na UInt8Array
        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
        
        // Tworzenie nowej subskrypcji
        subscription = await sw.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey
        });
      }
      
      // Zapisanie subskrypcji w bazie danych
      const { error } = await supabase
        .from('notification_subscriptions')
        .insert([
          {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh') as ArrayBuffer))),
              auth: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth') as ArrayBuffer)))
            }
          }
        ]);
      
      if (error) {
        console.error('Błąd podczas zapisywania subskrypcji:', error);
        if (!error.message.includes('duplicate')) {
          toast({
            title: "Błąd",
            description: "Nie udało się zapisać subskrypcji",
            variant: "destructive",
          });
          return;
        }
      }
      
      setIsSubscribed(true);
      
      toast({
        title: "Sukces!",
        description: "Będziesz otrzymywać powiadomienia o zmianach kodu zagrożenia",
      });
      
    } catch (error) {
      console.error('Błąd podczas subskrypcji powiadomień:', error);
      
      toast({
        title: "Błąd",
        description: "Nie udało się subskrybować powiadomień",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribeFromNotifications = async () => {
    setIsLoading(true);
    
    try {
      const sw = await navigator.serviceWorker.ready;
      const subscription = await sw.pushManager.getSubscription();
      
      if (subscription) {
        // Usuń subskrypcję z bazy danych
        await supabase
          .from('notification_subscriptions')
          .delete()
          .eq('endpoint', subscription.endpoint);
        
        // Anuluj subskrypcję
        await subscription.unsubscribe();
      }
      
      setIsSubscribed(false);
      
      toast({
        title: "Wypisano",
        description: "Nie będziesz już otrzymywać powiadomień",
      });
      
    } catch (error) {
      console.error('Błąd podczas anulowania subskrypcji:', error);
      
      toast({
        title: "Błąd",
        description: "Nie udało się anulować subskrypcji",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Jeśli przeglądarka nie obsługuje powiadomień
  if (!('Notification' in window)) {
    return null;
  }

  return (
    <Button 
      variant={isSubscribed ? "outline" : "default"}
      className="flex items-center gap-2"
      onClick={isSubscribed ? unsubscribeFromNotifications : subscribeToNotifications}
      disabled={isLoading}
    >
      {isSubscribed ? (
        <>
          <BellOff className="h-4 w-4" />
          Wyłącz powiadomienia
        </>
      ) : (
        <>
          <Bell className="h-4 w-4" />
          Włącz powiadomienia
        </>
      )}
    </Button>
  );
}

// Funkcja pomocnicza do konwersji klucza VAPID
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
