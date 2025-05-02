
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { ThreatCode, threatLevelsInfo } from "@/types/alert";
import { useAlert } from "@/contexts/AlertContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast";

export function UpdateAlertForm() {
  const { currentThreatLevel, updateAlert, isLoading } = useAlert();
  const { toast } = useToast();
  
  const [selectedThreatCode, setSelectedThreatCode] = useState<ThreatCode>(
    (currentThreatLevel?.threat_code as ThreatCode) || "green"
  );
  const [message, setMessage] = useState(currentThreatLevel?.message || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await updateAlert(selectedThreatCode, message);
      toast({
        title: "Sukces",
        description: "Kod zagrożenia został zaktualizowany",
        variant: "default",
      });
    } catch (error) {
      console.error("Błąd podczas aktualizacji kodu zagrożenia:", error);
      toast({
        title: "Błąd",
        description: "Nie udało się zaktualizować kodu zagrożenia",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border border-gray-200">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <Shield className="h-6 w-6 text-gray-600" />
        <h2 className="text-xl font-semibold">Panel Zarządzania Alertami</h2>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-6">
          Zmień kod zagrożenia w mieście i dodaj opcjonalną wiadomość z wyjaśnieniem
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h3 className="text-lg font-medium">Wybierz poziom zagrożenia</h3>
              </div>
              
              <RadioGroup 
                value={selectedThreatCode} 
                onValueChange={(value) => setSelectedThreatCode(value as ThreatCode)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {Object.entries(threatLevelsInfo).map(([code, info]) => (
                  <div key={code} className="flex items-start space-x-2">
                    <RadioGroupItem value={code} id={`alert-${code}`} className="mt-1" />
                    <div className="flex-1">
                      <Label 
                        htmlFor={`alert-${code}`}
                        className={`flex items-center gap-2 p-3 border rounded-md cursor-pointer ${
                          selectedThreatCode === code ? 'border-2' : 'border'
                        }`}
                        style={{ 
                          borderColor: selectedThreatCode === code ? info.color : 'hsl(var(--border))',
                          backgroundColor: selectedThreatCode === code ? info.bgColor : ''
                        }}
                      >
                        <div 
                          className={`h-5 w-5 rounded-full flex items-center justify-center`} 
                          style={{ backgroundColor: info.color }}
                        >
                          {code === "black" ? (
                            <span className="h-2 w-2 bg-white rounded-full"></span>
                          ) : null}
                        </div>
                        <div>
                          <p className="font-medium">{info.name}</p>
                          <p className="text-sm text-gray-600">{info.description}</p>
                        </div>
                      </Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div>
              <h3 className="flex items-center gap-2 mb-2 mt-6">
                <Info className="h-5 w-5 text-blue-500" />
                <span className="text-lg font-medium">Informacje dodatkowe (opcjonalnie)</span>
              </h3>
              <Textarea
                placeholder="Wprowadź dodatkowe informacje o zmianie kodu zagrożenia..."
                className="min-h-[100px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2"
              disabled={isSubmitting || isLoading}
            >
              <CheckCircle className="h-4 w-4" />
              Aktualizuj kod zagrożenia
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function Info(props: React.ComponentProps<typeof AlertTriangle>) {
  return <AlertTriangle {...props} />;
}
