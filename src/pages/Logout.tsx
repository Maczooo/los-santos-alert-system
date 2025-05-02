
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Logout() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // W rzeczywistej aplikacji, tutaj byłaby logika wylogowania
    toast({
      title: "Wylogowano",
      description: "Zostałeś pomyślnie wylogowany z systemu",
    });
    
    // Przekieruj na stronę główną po wylogowaniu
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Wylogowywanie...</h1>
        <p className="text-gray-600">Trwa wylogowywanie z systemu</p>
      </div>
    </div>
  );
}
