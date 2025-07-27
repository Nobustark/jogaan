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
  location: z.string().describe('The location of the vendor (e.g., city, neighborhood).'),
  weather: z.string().describe('The current weather conditions (e.g., "Sunny, 85°F").'),
  workingHours: z.string().describe("The vendor's operating hours (e.g., \"11am - 9pm\")."),
  dishes: z.array(z.string()).describe('A list of dishes the vendor wants to make.'),
});
export type IngredientSuggestionsInput = z.infer<typeof IngredientSuggestionsInputSchema>;

const IngredientSuggestionSchema = z.object({
  ingredient: z.string().describe('The name of the suggested ingredient.'),
  quantity: z.string().describe('The suggested quantity for the ingredient (e.g., "10 kg", "5 liters").'),
});

const IngredientSuggestionsOutputSchema = z.object({
  suggestions: z.array(IngredientSuggestionSchema).describe('A list of suggested ingredients with quantities.'),
});
export type IngredientSuggestionsOutput = z.infer<typeof IngredientSuggestionsOutputSchema>;

export async function getIngredientSuggestions(input: IngredientSuggestionsInput): Promise<IngredientSuggestionsOutput> {
  return ingredientSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'ingredientSuggestionsPrompt',
  input: {schema: IngredientSuggestionsInputSchema},
  output: {schema: IngredientSuggestionsOutputSchema},
  prompt: `You are an AI assistant for a street food vendor. Your goal is to suggest the names and quantities of fresh ingredients needed to prepare a list of dishes.

  Consider the vendor's context to provide smart suggestions.
  - Location: Affects local tastes and ingredient availability.
  - Weather: Influences what dishes are popular (e.g., hot drinks in cold weather).
  - Working Hours: Helps estimate the total amount of food to prepare.

  Vendor Context:
  Location: {{{location}}}
  Current Weather: {{{weather}}}
  Working Hours: {{{workingHours}}}

  Dishes to prepare:
  {{#each dishes}}
    - {{this}}
  {{/each}}

  Based on the dishes and the context, provide a list of fresh ingredients and the estimated quantity required.
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
