"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, LineChart, AlertTriangle, Wand2 } from "lucide-react";

import { predictTrendsAction } from "@/app/actions/predict-trends";
import type { TrendingItemPredictionsOutput } from "@/ai/flows/trending-item-predictions";
import { Progress } from "../ui/progress";

const formSchema = z.object({
  transactionData: z.string().min(10, "Please provide more detailed transaction data."),
  marketplaceContext: z.string().min(10, "Please provide more detailed marketplace context."),
});

const mockTransactionData = `Last 24 hours:
- Celestial Blade (game-1): 500 sales, avg price 9,500 R$, price up 15%
- Mythical Egg (game-3): 1,200 sales, avg price 24,000 R$, price up 5%
- Plasma Rifle (game-2): 300 sales, avg price 7,800 R$, price up 2%
- Starshard Amulet (game-1): 800 sales, avg price 4,500 R$, price down 10%
- Rainbow Potion (game-3): 10,000 sales, avg price 100 R$, price stable
`;
const mockMarketplaceContext = `Current Trends:
- "Starfall Adventures" just released a new dungeon, driving demand for high-tier weapons.
- A popular streamer started a "Petopia" series, increasing new player count.
- "Cybernetic Horizon" has an upcoming event, but player activity is currently low.
`;


export function TrendingItemAnalyzer() {
  const [prediction, setPrediction] = useState<TrendingItemPredictionsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionData: mockTransactionData,
      marketplaceContext: mockMarketplaceContext,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setPrediction(null);

    const result = await predictTrendsAction(values);

    if (result.success && result.data) {
      setPrediction(result.data);
    } else {
      const errorMessage = typeof result.error === 'string' 
        ? result.error 
        : "An unknown error occurred. Please check the inputs and try again.";
      setError(errorMessage);
    }
    setIsLoading(false);
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Wand2 className="h-6 w-6 glow-accent" />
            Trend Analyzer
          </CardTitle>
          <CardDescription>Input marketplace data to predict the next trending items.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="transactionData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Real-time Transaction Data</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste transaction data here..." {...field} rows={8} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marketplaceContext"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marketplace Context</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe current trends, events, etc..." {...field} rows={6} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <LineChart />
                )}
                Predict Trends
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">Prediction Results</CardTitle>
          <CardDescription>The AI's analysis of potential trending items will appear here.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          {isLoading && (
             <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p>Analyzing market data...</p>
             </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Prediction Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {prediction && (
            <div className="w-full space-y-6">
                <div>
                    <h3 className="font-bold mb-2">Predicted Items</h3>
                    <ul className="space-y-4">
                        {prediction.predictedTrendingItems.map((item, index) => (
                            <li key={index}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-medium">{item}</span>
                                    <span className="text-sm text-muted-foreground">{(prediction.confidenceLevels[index] * 100).toFixed(0)}% confidence</span>
                                </div>
                                <Progress value={prediction.confidenceLevels[index] * 100} />
                            </li>
                        ))}
                    </ul>
                </div>
                 <div>
                    <h3 className="font-bold mb-2">Explanation</h3>
                    <p className="text-sm text-muted-foreground bg-secondary p-4 rounded-md">{prediction.explanation}</p>
                </div>
            </div>
          )}
          {!isLoading && !error && !prediction && (
            <div className="text-center text-muted-foreground">
                <LineChart className="mx-auto h-12 w-12" />
                <p className="mt-4">Your trend predictions are waiting.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
