"use server";

import { predictTrendingItems, TrendingItemPredictionsInput, TrendingItemPredictionsOutput } from "@/ai/flows/trending-item-predictions";
import { z } from "zod";

const ActionInputSchema = z.object({
  transactionData: z.string().min(10, { message: "Transaction data must be at least 10 characters." }),
  marketplaceContext: z.string().min(10, { message: "Marketplace context must be at least 10 characters." }),
});

export async function predictTrendsAction(
  input: TrendingItemPredictionsInput
): Promise<{ success: boolean; data: TrendingItemPredictionsOutput | null; error: any }> {
  
  const validation = ActionInputSchema.safeParse(input);
  if (!validation.success) {
    return { success: false, data: null, error: validation.error.flatten() };
  }

  try {
    const result = await predictTrendingItems(validation.data);
    return { success: true, data: result, error: null };
  } catch (error) {
    console.error("Error in predictTrendsAction:", error);
    return { success: false, data: null, error: "An unexpected error occurred while predicting trends." };
  }
}
