import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ItemsTable } from "./ItemsTable";
import { GamesTable } from "./GamesTable";
import { CategoriesTable } from "./CategoriesTable";
import { items, games, gameCategories } from "@/lib/data";

export function AdminTabs() {
  return (
    <Tabs defaultValue="items" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="items">Items</TabsTrigger>
        <TabsTrigger value="games">Games</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
      </TabsList>
      <TabsContent value="items" className="mt-4">
        <ItemsTable initialItems={items} games={games} />
      </TabsContent>
      <TabsContent value="games" className="mt-4">
        <GamesTable initialGames={games} />
      </TabsContent>
      <TabsContent value="categories" className="mt-4">
        <CategoriesTable initialCategories={gameCategories} />
      </TabsContent>
    </Tabs>
  );
}
