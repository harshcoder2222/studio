import { AppLayout } from '@/components/layout/AppLayout';
import { TrendingItemAnalyzer } from '@/components/trends/TrendingItemAnalyzer';

export default function TrendsPage() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Marketplace Trend Analysis
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            Leverage AI to forecast the next big items. Analyze transaction data and market context to stay ahead of the curve.
          </p>
        </div>
        <TrendingItemAnalyzer />
      </div>
    </AppLayout>
  );
}
