"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { Item } from '@/lib/types';
import { useToast } from "@/hooks/use-toast"

interface WishlistContextType {
  wishlist: Item[];
  addToWishlist: (item: Item) => void;
  removeFromWishlist: (itemId: string) => void;
  isInWishlist: (itemId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Item[]>([]);
  const { toast } = useToast();

  const addToWishlist = useCallback((item: Item) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.find(i => i.id === item.id)) {
        return prevWishlist;
      }
      toast({
        title: "Added to Wishlist",
        description: `${item.name} has been added to your wishlist.`,
      })
      return [...prevWishlist, item];
    });
  }, [toast]);

  const removeFromWishlist = useCallback((itemId: string) => {
    setWishlist((prevWishlist) => {
      const item = prevWishlist.find(i => i.id === itemId);
      if (item) {
        toast({
          title: "Removed from Wishlist",
          description: `${item.name} has been removed from your wishlist.`,
        })
      }
      return prevWishlist.filter((item) => item.id !== itemId);
    });
  }, [toast]);

  const isInWishlist = useCallback((itemId: string) => {
    return wishlist.some((item) => item.id === itemId);
  }, [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
