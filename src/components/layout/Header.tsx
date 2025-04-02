
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b bg-white py-3 px-4 md:px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <ThumbsUp className="h-6 w-6 text-swipecheck-blue" />
          <span>SwipeCheck</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/dashboard" className="text-foreground/80 hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link to="/projects" className="text-foreground/80 hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link to="/tests" className="text-foreground/80 hover:text-foreground transition-colors">
              Tests
            </Link>
          </nav>
          <Button variant="outline" size="sm" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
