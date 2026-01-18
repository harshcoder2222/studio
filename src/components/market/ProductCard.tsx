"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Item, Game } from "@/lib/types";
import { rarityColors } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RobuxIcon } from "@/components/icons";
import { useWishlist } from "@/context/WishlistContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useOrders } from "@/context/OrderContext";

interface ProductCardProps {
  item: Item;
  game: Game;
}

export function ProductCard({ item, game }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addOrder } = useOrders();
  const [username, setUsername] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const isWishlisted = isInWishlist(item.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  const handleBuy = () => {
    if (username.trim()) {
      addOrder(item, username);
      window.open(item.robloxUrl, '_blank', 'noopener,noreferrer');
      setDialogOpen(false);
      setUsername("");
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50 flex flex-col">
      <CardHeader className="p-0 relative">
        <div className="absolute top-2 right-2 z-10">
          <Badge className={cn("text-white", rarityColors[item.rarity])}>{item.rarity}</Badge>
        </div>
        <Link href={`/games/${game.id}`}>
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={300}
            height={300}
            className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110"
            data-ai-hint="game item"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline tracking-tight truncate">
            {item.name}
        </CardTitle>
        <Link href={`/games/${game.id}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
            {game.name}
        </Link>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-1 font-bold text-lg">
          <RobuxIcon className="h-5 w-5 text-accent glow-accent" />
          <span>{item.price.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleWishlistClick}
                            className="hover:bg-destructive/20"
                        >
                            <Heart className={cn("h-5 w-5", isWishlisted ? "text-red-500 fill-current" : "text-muted-foreground")} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{isWishlisted ? "Remove from wishlist" : "Add to wishlist"}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-primary/90 hover:bg-primary text-primary-foreground">
                    <ShoppingCart />
                    Buy
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Confirm Purchase</DialogTitle>
                  <DialogDescription>
                    Enter your username to complete the purchase for &quot;{item.name}&quot;. The item will be delivered to this account.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="col-span-3"
                      placeholder="YourRobloxUsername"
                      onKeyDown={(e) => e.key === 'Enter' && handleBuy()}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleBuy} disabled={!username.trim()}>Confirm & Buy</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
}
