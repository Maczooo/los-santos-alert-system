
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Plus, Edit, Trash } from "lucide-react";
import { ThreatCode, threatLevelsInfo } from "@/types/alert";

type Recommendation = {
  id: string;
  threat_code: ThreatCode;
  title: string;
  description: string;
};

export function RecommendationsManager() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [threatCode, setThreatCode] = useState<ThreatCode>("green");
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    setIsLoading(true);
    
    const { data, error } = await supabase
      .from('threat_recommendations')
      .select('*')
      .order('threat_code', { ascending: true })
      .order('title', { ascending: true });
    
    if (error) {
      console.error('Błąd podczas pobierania zaleceń:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się pobrać zaleceń",
        variant: "destructive",
      });
    } else if (data) {
      setRecommendations(data as Recommendation[]);
    }
    
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Błąd",
        description: "Wszystkie pola muszą być wypełnione",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      if (editingId) {
        // Aktualizacja istniejącego zalecenia
        const { error } = await supabase
          .from('threat_recommendations')
          .update({
            threat_code: threatCode,
            title: title,
            description: description,
          })
          .eq('id', editingId);
        
        if (error) throw error;
        
        toast({
          title: "Sukces",
          description: "Zalecenie zostało zaktualizowane",
        });
        
        setEditingId(null);
      } else {
        // Dodanie nowego zalecenia
        const { error } = await supabase
          .from('threat_recommendations')
          .insert([
            {
              threat_code: threatCode,
              title: title,
              description: description,
            },
          ]);
        
        if (error) throw error;
        
        toast({
          title: "Sukces",
          description: "Nowe zalecenie zostało dodane",
        });
      }
      
      // Reset formularza i odświeżenie listy
      setTitle("");
      setDescription("");
      setThreatCode("green");
      fetchRecommendations();
      
    } catch (error) {
      console.error("Błąd:", error);
      toast({
        title: "Błąd",
        description: "Nie udało się zapisać zalecenia",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (rec: Recommendation) => {
    setTitle(rec.title);
    setDescription(rec.description);
    setThreatCode(rec.threat_code);
    setEditingId(rec.id);
    
    // Przewiń do formularza
    document.getElementById("recommendation-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Czy na pewno chcesz usunąć to zalecenie?")) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('threat_recommendations')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Sukces",
        description: "Zalecenie zostało usunięte",
      });
      
      fetchRecommendations();
      
    } catch (error) {
      console.error("Błąd:", error);
      toast({
        title: "Błąd",
        description: "Nie udało się usunąć zalecenia",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setThreatCode("green");
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      <Card className="border border-gray-200">
        <CardHeader className="flex flex-row items-center gap-3 pb-2">
          <Shield className="h-6 w-6 text-gray-600" />
          <h2 className="text-xl font-semibold">Zarządzanie zaleceniami bezpieczeństwa</h2>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Aktualne zalecenia</h3>
            
            {isLoading ? (
              <p className="text-gray-500 text-center py-4">Ładowanie zaleceń...</p>
            ) : recommendations.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Brak zaleceń</p>
            ) : (
              <div className="divide-y">
                {recommendations.map((rec) => {
                  const threatInfo = threatLevelsInfo[rec.threat_code];
                  
                  return (
                    <div key={rec.id} className="py-4 flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: threatInfo.color }}
                          />
                          <h4 className="font-medium">{rec.title}</h4>
                        </div>
                        <p className="text-gray-600 text-sm ml-5">{rec.description}</p>
                        <p className="text-gray-500 text-xs ml-5 mt-1">Kod: {threatInfo.name}</p>
                      </div>
                      
                      <div className="flex items-center">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEdit(rec)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDelete(rec.id)}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          <div id="recommendation-form">
            <h3 className="text-lg font-medium mb-3">
              {editingId ? "Edytuj zalecenie" : "Dodaj nowe zalecenie"}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <label htmlFor="threat-code" className="block text-sm font-medium mb-1">Kod zagrożenia</label>
                  <Select value={threatCode} onValueChange={(value) => setThreatCode(value as ThreatCode)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz kod zagrożenia" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(threatLevelsInfo).map(([code, info]) => (
                        <SelectItem key={code} value={code}>
                          <div className="flex items-center gap-2">
                            <span 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: info.color }}
                            />
                            {info.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">Tytuł zalecenia</label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Np. Zostań w domu"
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">Opis</label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Szczegółowy opis zalecenia..."
                    rows={4}
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button type="submit" className="flex items-center gap-2" disabled={isLoading}>
                  {editingId ? (
                    <>
                      <Edit className="h-4 w-4" />
                      Aktualizuj zalecenie
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      Dodaj zalecenie
                    </>
                  )}
                </Button>
                
                {editingId && (
                  <Button type="button" variant="outline" onClick={resetForm} disabled={isLoading}>
                    Anuluj edycję
                  </Button>
                )}
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
