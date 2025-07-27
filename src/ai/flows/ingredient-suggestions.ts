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
  prompt: `You are an AI assistant helping street food vendors discover ingredients they might need.

  Based on their past orders and current market trends, suggest a list of ingredients that the vendor should consider ordering.
  The vendor ID is: {{{vendorId}}}.

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

  Please provide a list of ingredient suggestions based on this information.  Do not repeat ingredients that are already in past orders.
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
