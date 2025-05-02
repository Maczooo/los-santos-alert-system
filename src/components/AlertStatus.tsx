
import { ThreatLevel, threatLevelsInfo } from "@/types/alert";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface AlertStatusProps {
  threatLevel: ThreatLevel;
}

export function AlertStatus({ threatLevel }: AlertStatusProps) {
  const info = threatLevelsInfo[threatLevel.threat_code as keyof typeof threatLevelsInfo];
  
  if (!info) return null;

  return (
    <Card className={`border-l-4`} style={{ borderLeftColor: info.color, backgroundColor: info.bgColor }}>
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <AlertTriangle className="h-6 w-6" style={{ color: info.color }} />
        <h2 className="text-xl font-semibold" style={{ color: info.textColor }}>Status Zagrożenia</h2>
        <div className="ml-auto">
          <span 
            className="px-4 py-1 rounded-full text-sm font-semibold"
            style={{ 
              backgroundColor: info.color, 
              color: info.code === 'black' ? 'white' : info.textColor 
            }}
          >
            {info.name}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-medium mb-2" style={{ color: info.textColor }}>
          {threatLevel.message || info.description}
        </h3>
        
        {threatLevel.message && (
          <p className="text-sm mt-2" style={{ color: info.textColor }}>
            {info.description}
          </p>
        )}
        
        <div className="mt-6">
          <h4 className="font-medium mb-2" style={{ color: info.textColor }}>Zalecenia dla mieszkańców:</h4>
          <ul className="list-disc pl-5 space-y-1" style={{ color: info.textColor }}>
            <li>Unikaj obszarów, gdzie zgłaszano zamieszki</li>
            <li>Stosuj się do poleceń funkcjonariuszy LSPD</li>
            <li>Rozważ alternatywne trasy przemieszczania się po mieście</li>
            <li>Zachowaj szczególną ostrożność w godzinach wieczornych</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
