"use client";

import { useState, useMemo } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProductCard } from '@/components/market/ProductCard';
import { FilterControls } from '@/components/market/FilterControls';
import { items, games, gameCategories } from '@/lib/data';
import type { Item, Game } from '@/lib/types';

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [selectedGame, setSelectedGame] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 50000]);

  const gamesMap = useMemo(() => {
    return games.reduce((acc, game) => {
      acc[game.id] = game;
      return acc;
    }, {} as Record<string, Game>);
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const game = gamesMap[item.gameId];
      if (!game) return false;

      const searchLower = search.toLowerCase();
      const nameMatch = item.name.toLowerCase().includes(searchLower);
      const gameNameMatch = game.name.toLowerCase().includes(searchLower);

      const gameMatch = selectedGame === 'all' || game.id === selectedGame;
      const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
      const rarityMatch = selectedRarity === 'all' || item.rarity === selectedRarity;
      const priceMatch = item.price >= priceRange[0] && item.price <= priceRange[1];

      return (nameMatch || gameNameMatch) && gameMatch && categoryMatch && rarityMatch && priceMatch;
    });
  }, [search, selectedGame, selectedCategory, selectedRarity, priceRange, gamesMap]);

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Explore the Universe Market
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Discover rare items and gamepasses from your favorite games.
          </p>
        </div>

        <FilterControls
          search={search}
          setSearch={setSearch}
          selectedGame={selectedGame}
          setSelectedGame={setSelectedGame}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedRarity={selectedRarity}
          setSelectedRarity={setSelectedRarity}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          games={games}
          gameCategories={gameCategories}
        />

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredItems.map((item) => (
              <ProductCard key={item.id} item={item} game={gamesMap[item.gameId]} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold">No items found</h2>
            <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
