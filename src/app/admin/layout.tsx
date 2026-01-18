
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { Loader2 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isAuthenticated = false;
    try {
      isAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";
    } catch (e) {
      console.error("Could not access localStorage. Admin panel will not be available.");
    }
    
    setIsLoading(false);

    if (pathname === '/admin/login') {
      if (isAuthenticated) {
        router.replace("/admin");
      } else {
        setIsVerified(true);
      }
    } else {
      if (!isAuthenticated) {
        router.replace("/admin/login");
      } else {
        setIsVerified(true);
      }
    }
  }, [pathname, router]);

  if (isLoading || !isVerified) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return <AppLayout>{children}</AppLayout>;
}
