import { Logo } from "@/components/shared/Logo";
import { Twitter, Github, Dribbble } from "lucide-react";
import { Button } from "../ui/button";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              The ultimate marketplace for digital game assets.
            </p>
          </div>
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
             </Button>
             <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
             </Button>
             <Button variant="ghost" size="icon">
                <Dribbble className="h-5 w-5" />
             </Button>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Universe Game Market. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
