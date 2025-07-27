"use server";

import { getIngredientSuggestions, IngredientSuggestionsInput, IngredientSuggestionsOutput } from '@/ai/flows/ingredient-suggestions';

export async function fetchIngredientSuggestions(input: IngredientSuggestionsInput): Promise<IngredientSuggestionsOutput> {
  try {
    const result = await getIngredientSuggestions(input);
    return result;
  } catch (error) {
    console.error("Error fetching ingredient suggestions:", error);
    // Return a graceful error or empty array
    return { suggestions: [] };
  }
}
