"use client";

import { useWishlist } from "@/context/WishlistContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProductCard } from "@/components/market/ProductCard";
import { games } from "@/lib/data";
import type { Game } from "@/lib/types";
import { useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  const gamesMap = useMemo(() => {
    return games.reduce((acc, game) => {
      acc[game.id] = game;
      return acc;
    }, {} as Record<string, Game>);
  }, []);

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Your Wishlist</h1>
          <p className="mt-2 text-muted-foreground">Items you've saved for later.</p>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {wishlist.map((item) => (
              <ProductCard key={item.id} item={item} game={gamesMap[item.gameId]} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border-2 border-dashed rounded-lg">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 text-2xl font-bold tracking-tight">Your wishlist is empty</h2>
            <p className="mt-2 text-muted-foreground">Start browsing the market to add items.</p>
            <Button asChild className="mt-6">
              <Link href="/">Explore Market</Link>
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
