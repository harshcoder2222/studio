import { AppLayout } from '@/components/layout/AppLayout';
import { AdminTabs } from '@/components/admin/AdminTabs';

export default function AdminPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Manage your marketplace content.</p>
        </div>
        <AdminTabs />
      </div>
    </AppLayout>
  );
}
