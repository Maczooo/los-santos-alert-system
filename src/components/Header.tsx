
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-6 w-6" />
          <span className="font-semibold text-lg">System Alertów Miejskich</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Strona główna
          </Link>
          <Link to="/admin" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Panel administratora
          </Link>
          <Button variant="outline" size="sm" asChild>
            <Link to="/logout">Wyloguj</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
