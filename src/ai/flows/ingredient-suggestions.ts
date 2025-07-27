// Ingredient suggestions for vendors based on past orders and current trends.

'use server';

/**
 * @fileOverview Ingredient suggestions flow for vendors.
 *
 * - getIngredientSuggestions - A function that returns ingredient suggestions for a vendor.
 * - IngredientSuggestionsInput - The input type for the getIngredientSuggestions function.
 * - IngredientSuggestionsOutput - The return type for the getIngredientSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IngredientSuggestionsInputSchema = z.object({
  vendorId: z.string().describe('The ID of the vendor.'),
  location: z.string().optional().describe('The location of the vendor (e.g., city, neighborhood).'),
  weather: z.string().optional().describe('The current weather conditions (e.g., "Sunny, 85°F").'),
  workingHours: z.string().optional().describe('The vendor\'s operating hours (e.g., "11am - 9pm").'),
  pastOrders: z.array(
    z.object({
      ingredient: z.string(),
      quantity: z.number(),
      orderDate: z.string().datetime(),
    })
  ).optional().describe('A list of past orders for the vendor.'),
  trendingIngredients: z.array(z.string()).optional().describe('A list of trending ingredients in the market.'),
});
export type IngredientSuggestionsInput = z.infer<typeof IngredientSuggestionsInputSchema>;

const IngredientSuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of suggested ingredients for the vendor.'),
});
export type IngredientSuggestionsOutput = z.infer<typeof IngredientSuggestionsOutputSchema>;

export async function getIngredientSuggestions(input: IngredientSuggestionsInput): Promise<IngredientSuggestionsOutput> {
  return ingredientSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'ingredientSuggestionsPrompt',
  input: {schema: IngredientSuggestionsInputSchema},
  output: {schema: IngredientSuggestionsOutputSchema},
  prompt: `You are an AI assistant helping a street food vendor discover ingredients they might need.

  Analyze the vendor's context to provide smart suggestions. Consider their location, the current weather, and their working hours to recommend ingredients that would sell well. For example, suggest refreshing drinks on a hot day, or hearty ingredients for a cold evening.

  Vendor ID: {{{vendorId}}}
  Location: {{{location}}}
  Current Weather: {{{weather}}}
  Working Hours: {{{workingHours}}}

  Here are the vendor's past orders, if available:
  {{#if pastOrders}}
    {{#each pastOrders}}
      - {{ingredient}} (Quantity: {{quantity}}, Date: {{orderDate}})
    {{/each}}
  {{else}}
    The vendor has no past orders.
  {{/if}}

  Here are the current trending ingredients, if available:
  {{#if trendingIngredients}}
    {{#each trendingIngredients}}
      - {{this}}
    {{/each}}
  {{else}}
    There are no trending ingredients available.
  {{/if}}

  Please provide a list of ingredient suggestions based on all this information. Do not repeat ingredients that are already in past orders.
  Return only a simple javascript array with ingredient names.
  `,
});

const ingredientSuggestionsFlow = ai.defineFlow(
  {
    name: 'ingredientSuggestionsFlow',
    inputSchema: IngredientSuggestionsInputSchema,
    outputSchema: IngredientSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
