import Image from 'next/image';
import { notFound } from 'next/navigation';
import { games, items } from '@/lib/data';
import type { Item, Game } from '@/lib/types';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProductCard } from '@/components/market/ProductCard';
import { Card, CardContent } from '@/components/ui/card';
import { Users, ThumbsUp } from 'lucide-react';

export async function generateStaticParams() {
  return games.map((game) => ({
    gameId: game.id,
  }));
}

function getGameData(gameId: string): { game: Game; gameItems: Item[] } | null {
  const game = games.find((g) => g.id === gameId);
  if (!game) {
    return null;
  }
  const gameItems = items.filter((item) => item.gameId === gameId);
  return { game, gameItems };
}

export default function GamePage({ params }: { params: { gameId: string } }) {
  const data = getGameData(params.gameId);

  if (!data) {
    notFound();
  }

  const { game, gameItems } = data;
  const gamesMap = { [game.id]: game };

  return (
    <AppLayout>
      <div className="relative h-64 md:h-80 w-full">
        <Image
          src={game.bannerUrl}
          alt={`${game.name} banner`}
          fill
          className="object-cover"
          priority
          data-ai-hint="game banner"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-24 md:-mt-32">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-lg overflow-hidden border-4 border-background shadow-lg shrink-0">
            <Image
              src={game.logoUrl}
              alt={`${game.name} logo`}
              fill
              className="object-cover"
              data-ai-hint="game logo"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">{game.name}</h1>
            <div className="flex items-center justify-center md:justify-start gap-6 mt-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                <span>{game.stats.players.toLocaleString()} Players</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-accent" />
                <span>{game.stats.likes.toLocaleString()} Likes</span>
              </div>
            </div>
          </div>
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <p className="text-muted-foreground">{game.description}</p>
          </CardContent>
        </Card>

        <div className="mt-12">
          <h2 className="font-headline text-3xl font-bold mb-6">Items & Gamepasses</h2>
          {gameItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {gameItems.map((item) => (
                <ProductCard key={item.id} item={item} game={game} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card rounded-lg">
              <h3 className="text-2xl font-bold">No items found</h3>
              <p className="text-muted-foreground mt-2">Check back later for new items in {game.name}!</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
