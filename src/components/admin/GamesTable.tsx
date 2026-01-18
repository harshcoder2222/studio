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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GameForm } from "./GameForm";
import { useToast } from "@/hooks/use-toast";
import type { Game } from "@/lib/types";
import { gameCategories } from "@/lib/data";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

interface GamesTableProps {
  initialGames: Game[];
}

export function GamesTable({ initialGames }: GamesTableProps) {
  const [games, setGames] = useState(initialGames);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | undefined>(undefined);
  const { toast } = useToast();

  const handleFormSubmit = (values: any) => {
    // In a real app, this would be an API call.
    if (editingGame) {
      setGames(games.map((g) => (g.id === editingGame.id ? { ...editingGame, ...values } : g)));
      toast({ title: "Game Updated", description: `${values.name} has been updated.` });
    } else {
      const newGame = { ...values, id: `game-${Date.now()}`, stats: { players: 0, likes: 0 } };
      setGames([...games, newGame]);
      toast({ title: "Game Added", description: `${values.name} has been added.` });
    }
    setIsFormOpen(false);
    setEditingGame(undefined);
  };

  const handleEdit = (game: Game) => {
    setEditingGame(game);
    setIsFormOpen(true);
  };
  
  const handleDelete = (game: Game) => {
    // In a real app, this would be an API call and have a confirmation dialog.
    setGames(games.filter((g) => g.id !== game.id));
    toast({ title: "Game Deleted", description: `${game.name} has been deleted.`, variant: "destructive" });
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Dialog open={isFormOpen} onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingGame(undefined);
        }}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle /> Add New Game
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingGame ? "Edit Game" : "Add New Game"}</DialogTitle>
            </DialogHeader>
            <GameForm 
              categories={gameCategories} 
              game={editingGame}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Game</TableHead>
              <TableHead>Players</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
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
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(game)}>
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
    </div>
  );
}
