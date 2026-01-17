"use client";

import { useState } from "react";
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
import type { GameCategory } from "@/lib/types";
import { Edit, Trash2 } from "lucide-react";

interface CategoriesTableProps {
  initialCategories: GameCategory[];
}

export function CategoriesTable({ initialCategories }: CategoriesTableProps) {
  const [categories, setCategories] = useState(initialCategories);
  const { toast } = useToast();
  
  const handleDelete = (category: GameCategory) => {
    // In a real app, this would be an API call and have a confirmation dialog.
    setCategories(categories.filter((c) => c.id !== category.id));
    toast({ title: "Category Deleted", description: `${category.name} has been deleted.`, variant: "destructive" });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-mono text-xs">{category.id}</TableCell>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(category)}>
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
