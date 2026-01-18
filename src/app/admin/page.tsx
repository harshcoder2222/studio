
import { ItemsTable } from '@/components/admin/ItemsTable';
import { items, games } from '@/lib/data';

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Manage Items</h1>
        <p className="mt-2 text-muted-foreground">Add, edit, or remove marketplace items and gamepasses.</p>
      </div>
      <ItemsTable initialItems={items} games={games} />
    </div>
  );
}
