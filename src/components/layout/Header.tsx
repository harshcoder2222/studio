"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Gamepad2, Heart, ShieldCheck, User, LogIn, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWishlist } from "@/context/WishlistContext";
import { Badge } from "@/components/ui/badge";

const navLinks = [
  { href: "/", label: "Market", icon: Gamepad2 },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
  { href: "/admin", label: "Admin", icon: ShieldCheck },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { wishlist } = useWishlist();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // This effect runs on the client-side after hydration.
    try {
      const adminAuth = localStorage.getItem("isAdminAuthenticated") === "true";
      setIsAuthenticated(adminAuth);
    } catch (e) {
      console.error("Could not access localStorage. Assuming not authenticated.");
      setIsAuthenticated(false);
    }
  }, [pathname]); // Re-check on every navigation

  const handleLogout = () => {
    try {
      localStorage.removeItem("isAdminAuthenticated");
      setIsAuthenticated(false);
      router.push("/admin/login");
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Logo />
        <nav className="ml-10 hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 transition-colors hover:text-primary",
                pathname === href ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
              {href === '/wishlist' && wishlist.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 justify-center">{wishlist.length}</Badge>
              )}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden sm:block w-full max-w-xs">
            {/* Search bar is part of the page content */}
          </div>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Admin</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout} className="cursor-pointer">
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <Button asChild>
                <Link href="/admin/login">
                  <LogIn />
                  Login
                </Link>
             </Button>
          )}
        </div>
      </div>
    </header>
  );
}
