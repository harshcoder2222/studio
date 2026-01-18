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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CategoryForm } from "./CategoryForm";
import { useToast } from "@/hooks/use-toast";
import type { GameCategory } from "@/lib/types";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

interface CategoriesTableProps {
  initialCategories: GameCategory[];
}

export function CategoriesTable({ initialCategories }: CategoriesTableProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<GameCategory | undefined>(undefined);
  const { toast } = useToast();

  const handleFormSubmit = (values: any) => {
    if (editingCategory) {
      setCategories(categories.map((c) => (c.id === editingCategory.id ? { ...editingCategory, ...values } : c)));
      toast({ title: "Category Updated", description: `${values.name} has been updated.` });
    } else {
      const newCategory = { ...values, id: `cat-${Date.now()}` };
      setCategories([...categories, newCategory]);
      toast({ title: "Category Added", description: `${values.name} has been added.` });
    }
    setIsFormOpen(false);
    setEditingCategory(undefined);
  };
  
  const handleEdit = (category: GameCategory) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleDelete = (category: GameCategory) => {
    // In a real app, this would be an API call and have a confirmation dialog.
    setCategories(categories.filter((c) => c.id !== category.id));
    toast({ title: "Category Deleted", description: `${category.name} has been deleted.`, variant: "destructive" });
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Dialog open={isFormOpen} onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingCategory(undefined);
        }}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle /> Add New Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
            </DialogHeader>
            <CategoryForm
              category={editingCategory}
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
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-mono text-xs">{category.id}</TableCell>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
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
    </div>
  );
}
