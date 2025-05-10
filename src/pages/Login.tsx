
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Shield, Lock } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Logowanie - System Alertów Miejskich Los Santos";
    
    // Sprawdź, czy użytkownik jest już zalogowany
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/admin');
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Głowne hasło dla prostego logowania
      if (email === "admin@doj.ls" && password === "Gubernatorstanu2468") {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        
        if (error) {
          // Jeśli konto nie istnieje, utwórz je
          if (error.message.includes("Invalid login credentials")) {
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ 
              email, 
              password,
              options: {
                data: {
                  role: 'admin'
                }
              }
            });
            
            if (signUpError) {
              toast({
                title: "Błąd podczas tworzenia konta",
                description: signUpError.message,
                variant: "destructive",
              });
            } else {
              toast({
                title: "Konto utworzone",
                description: "Możesz się teraz zalogować",
              });
              // Automatyczne logowanie po utworzeniu konta
              await supabase.auth.signInWithPassword({ email, password });
              navigate('/admin');
            }
          } else {
            toast({
              title: "Błąd logowania",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Zalogowano pomyślnie",
            description: "Witamy w panelu administratora",
          });
          navigate('/admin');
        }
      } else {
        toast({
          title: "Nieprawidłowe dane logowania",
          description: "Sprawdź email i hasło",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Błąd podczas logowania:", error);
      toast({
        title: "Błąd logowania",
        description: "Wystąpił nieoczekiwany błąd",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex justify-center items-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl text-center">Panel administratora</CardTitle>
            <CardDescription className="text-center">
              Wprowadź dane, aby uzyskać dostęp do panelu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@doj.ls"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Hasło</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full flex items-center gap-2" 
              onClick={handleSubmit} 
              disabled={isLoading}
            >
              <Lock className="h-4 w-4" />
              {isLoading ? "Logowanie..." : "Zaloguj się"}
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
