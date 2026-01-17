"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import type { Game } from "@/lib/types";
import { Edit, Trash2 } from "lucide-react";

interface GamesTableProps {
  initialGames: Game[];
}

export function GamesTable({ initialGames }: GamesTableProps) {
  const [games, setGames] = useState(initialGames);
  const { toast } = useToast();

  const handleDelete = (game: Game) => {
    // In a real app, this would be an API call and have a confirmation dialog.
    setGames(games.filter((g) => g.id !== game.id));
    toast({ title: "Game Deleted", description: `${game.name} has been deleted.`, variant: "destructive" });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Game</TableHead>
            <TableHead>Players</TableHead>
            <TableHead>Likes</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((game) => (
            <TableRow key={game.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Image src={game.logoUrl} alt={game.name} width={40} height={40} className="rounded-md" />
                  <span>{game.name}</span>
                </div>
              </TableCell>
              <TableCell>{game.stats.players.toLocaleString()}</TableCell>
              <TableCell>{game.stats.likes.toLocaleString()}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(game)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
