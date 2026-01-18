
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
import { ItemForm } from "./ItemForm";
import type { Item, Game } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Edit, Trash2, ExternalLink } from "lucide-react";
import { RobuxIcon } from "@/components/icons";

interface ItemsTableProps {
  initialItems: Item[];
  games: Game[];
}

export function ItemsTable({ initialItems, games }: ItemsTableProps) {
  const [items, setItems] = useState(initialItems);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | undefined>(undefined);
  const { toast } = useToast();

  const gamesMap = games.reduce((acc, game) => {
    acc[game.id] = game.name;
    return acc;
  }, {} as Record<string, string>);
  
  const handleFormSubmit = (values: any) => {
    // In a real app, this would be an API call.
    if (editingItem) {
      setItems(items.map((i) => (i.id === editingItem.id ? { ...editingItem, ...values } : i)));
      toast({ title: "Item Updated", description: `${values.name} has been updated.` });
    } else {
      const newItem = { ...values, id: `item-${Date.now()}` };
      setItems([...items, newItem]);
      toast({ title: "Item Added", description: `${values.name} has been added.` });
    }
    setIsFormOpen(false);
    setEditingItem(undefined);
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: Item) => {
    // In a real app, show a confirmation dialog.
    setItems(items.filter((i) => i.id !== item.id));
    toast({ title: "Item Deleted", description: `${item.name} has been deleted.`, variant: "destructive" });
  };
  
  return (
    <div>
      <div className="flex justify-end mb-4">
        <Dialog open={isFormOpen} onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingItem(undefined);
        }}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle /> Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Item" : "Add New Item"}</DialogTitle>
            </DialogHeader>
            <ItemForm 
              games={games} 
              item={editingItem}
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
              <TableHead>Item</TableHead>
              <TableHead>Game</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Rarity</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Link</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length > 0 ? items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Image src={item.imageUrl} alt={item.name} width={40} height={40} className="rounded-md object-cover" />
                    <span>{item.name}</span>
                  </div>
                </TableCell>
                <TableCell>{gamesMap[item.gameId] || "N/A"}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.rarity}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <RobuxIcon />
                    {item.price.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <Button asChild variant="outline" size="icon">
                    <a href={item.robloxUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${item.name} on Roblox`}>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(item)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
