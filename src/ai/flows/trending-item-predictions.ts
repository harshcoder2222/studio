'use server';

/**
 * @fileOverview This file defines a Genkit flow for predicting trending items in the marketplace.
 * The flow uses real-time transaction data to predict which items will become trending.
 * It exports:
 * - `predictTrendingItems`: Function to initiate the trending item prediction flow.
 * - `TrendingItemPredictionsInput`: Input type for the `predictTrendingItems` function.
 * - `TrendingItemPredictionsOutput`: Output type for the `predictTrendingItems` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrendingItemPredictionsInputSchema = z.object({
  transactionData: z.string().describe('Real-time marketplace transaction data.'),
  marketplaceContext: z.string().describe('Current marketplace conditions and trends.'),
});
export type TrendingItemPredictionsInput = z.infer<typeof TrendingItemPredictionsInputSchema>;

const TrendingItemPredictionsOutputSchema = z.object({
  predictedTrendingItems: z
    .array(z.string())
    .describe('A list of item names predicted to become trending.'),
  confidenceLevels: z
    .array(z.number())
    .describe('Confidence levels (0-1) for each predicted item.'),
  explanation: z.string().describe('Explanation of why these items are predicted to trend.'),
});
export type TrendingItemPredictionsOutput = z.infer<typeof TrendingItemPredictionsOutputSchema>;

export async function predictTrendingItems(
  input: TrendingItemPredictionsInput
): Promise<TrendingItemPredictionsOutput> {
  return trendingItemPredictionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'trendingItemPredictionsPrompt',
  input: {schema: TrendingItemPredictionsInputSchema},
  output: {schema: TrendingItemPredictionsOutputSchema},
  prompt: `You are an expert marketplace analyst, predicting trending items.

  Analyze the following marketplace transaction data and context to predict which items will become trending. Provide a list of predicted item names, their confidence levels, and an explanation for each prediction.

  Transaction Data: {{{transactionData}}}
  Marketplace Context: {{{marketplaceContext}}}

  Format your response as a JSON object:
  {
    "predictedTrendingItems": ["item1", "item2", ...],
    "confidenceLevels": [0.8, 0.9, ...],
    "explanation": "Explanation for each prediction."
  }`,
});

const trendingItemPredictionsFlow = ai.defineFlow(
  {
    name: 'trendingItemPredictionsFlow',
    inputSchema: TrendingItemPredictionsInputSchema,
    outputSchema: TrendingItemPredictionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
