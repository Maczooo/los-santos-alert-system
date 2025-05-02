
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Info } from "lucide-react";
import { threatLevelsInfo } from "@/types/alert";

export function SystemInfo() {
  return (
    <Card className="mt-6 bg-white">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <Info className="h-5 w-5 text-gray-600" />
        <h2 className="text-lg font-semibold">Informacje o Systemie</h2>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          System Alertów Miejskich dostarcza mieszkańcom Los Santos aktualne informacje o poziomie zagrożenia oraz zalecenia
          bezpieczeństwa. Kod zagrożenia jest aktualizowany przez służby bezpieczeństwa w zależności od sytuacji w mieście.
        </p>
        
        <h3 className="text-sm font-semibold mb-2">Poziomy Zagrożenia:</h3>
        
        <div className="space-y-2">
          {Object.values(threatLevelsInfo).map((level) => (
            <div key={level.code} className="flex items-center gap-2">
              <span 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: level.color }}
              />
              <span className="font-medium text-sm">{level.name}</span>
              <span className="text-sm text-gray-500">- {level.description}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-1">Aktualizacje:</h3>
          <p className="text-xs text-gray-600">
            System jest aktualizowany na bieżąco przez Departament Bezpieczeństwa Publicznego miasta Los Santos. Zalecamy
            regularne sprawdzanie statusu zagrożenia.
          </p>
        </div>
        
        <p className="mt-4 text-xs text-gray-500">
          W przypadku pytań lub wątpliwości prosimy o kontakt z Departamentem Bezpieczeństwa Publicznego.
        </p>
      </CardContent>
    </Card>
  );
}
