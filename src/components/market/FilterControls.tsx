"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import type { Game, GameCategory } from "@/lib/types";
import { rarities, itemCategories } from "@/lib/types";

interface FilterControlsProps {
  search: string;
  setSearch: (value: string) => void;
  selectedGame: string;
  setSelectedGame: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedRarity: string;
  setSelectedRarity: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  games: Game[];
  gameCategories: GameCategory[];
}

export function FilterControls({
  search,
  setSearch,
  selectedGame,
  setSelectedGame,
  selectedCategory,
  setSelectedCategory,
  selectedRarity,
  setSelectedRarity,
  priceRange,
  setPriceRange,
  games,
}: FilterControlsProps) {

  const resetFilters = () => {
    setSearch('');
    setSelectedGame('all');
    setSelectedCategory('all');
    setSelectedRarity('all');
    setPriceRange([0, 50000]);
  }

  return (
    <div className="mb-8 p-4 rounded-lg bg-card border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-center">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by item or game..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedGame} onValueChange={setSelectedGame}>
          <SelectTrigger><SelectValue placeholder="All Games" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Games</SelectItem>
            {games.map(game => <SelectItem key={game.id} value={game.id}>{game.name}</SelectItem>)}
          </SelectContent>
        </Select>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger><SelectValue placeholder="All Types" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {itemCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
          </SelectContent>
        </Select>
        
        <Select value={selectedRarity} onValueChange={setSelectedRarity}>
          <SelectTrigger><SelectValue placeholder="All Rarities" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Rarities</SelectItem>
            {rarities.map(rarity => <SelectItem key={rarity} value={rarity}>{rarity}</SelectItem>)}
          </SelectContent>
        </Select>
        
        <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm text-muted-foreground">
                <span>Price</span>
                <span>{priceRange[0]} - {priceRange[1]}+ R$</span>
            </div>
            <Slider
                min={0}
                max={50000}
                step={100}
                value={[priceRange[0]]}
                onValueChange={(value) => setPriceRange([value[0], 50000])}
            />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button variant="ghost" onClick={resetFilters}>
            <X />
            Reset Filters
        </Button>
      </div>
    </div>
  );
}
