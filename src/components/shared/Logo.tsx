import Link from "next/link";
import { Rocket } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Rocket className="h-6 w-6 glow-accent" />
      <span className="text-xl font-bold font-headline tracking-tighter">
        Universe<span className="text-primary">Market</span>
      </span>
    </Link>
  );
}
