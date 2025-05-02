
import { ThreatLevel, threatLevelsInfo } from "@/types/alert";
import { AlertTriangle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAlert } from "@/contexts/AlertContext";

interface AlertHistoryProps {
  history: ThreatLevel[];
}

export function AlertHistory({ history }: AlertHistoryProps) {
  const { formatDate } = useAlert();

  if (history.length === 0) return null;

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <Clock className="h-5 w-5 text-gray-600" />
        <h2 className="text-lg font-semibold">Ostatnie ogłoszenia</h2>
      </CardHeader>
      <CardContent className="p-0">
        {history.map((item, index) => {
          const info = threatLevelsInfo[item.threat_code as keyof typeof threatLevelsInfo];
          if (!info) return null;

          return (
            <div 
              key={item.id || index} 
              className={`border-l-4 p-4 ${index !== history.length - 1 ? 'border-b' : ''}`}
              style={{ borderLeftColor: info.color }}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" style={{ color: info.color }} />
                <span className="font-medium" style={{ color: info.textColor }}>
                  {info.name}
                </span>
                <time className="ml-auto text-sm text-gray-500">
                  {item.updated_at ? formatDate(item.updated_at) : ''}
                </time>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                {item.message || info.description}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
