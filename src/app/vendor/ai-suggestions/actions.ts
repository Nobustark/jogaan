"use server";

import { getIngredientSuggestions, IngredientSuggestionsInput } from '@/ai/flows/ingredient-suggestions';

export async function fetchIngredientSuggestions() {
  // In a real application, you would fetch this data from your database
  const mockInput: IngredientSuggestionsInput = {
    vendorId: 'vendor-123',
    pastOrders: [
      { ingredient: 'Tomatoes', quantity: 10, orderDate: new Date('2023-10-01T10:00:00Z').toISOString() },
      { ingredient: 'Onions', quantity: 15, orderDate: new Date('2023-10-01T10:00:00Z').toISOString() },
      { ingredient: 'Basmati Rice', quantity: 2, orderDate: new Date('2023-09-25T10:00:00Z').toISOString() },
    ],
    trendingIngredients: ['Avocado Oil', 'Quinoa', 'Sriracha Sauce', 'Gochujang'],
  };

  try {
    const result = await getIngredientSuggestions(mockInput);
    return result.suggestions;
  } catch (error) {
    console.error("Error fetching ingredient suggestions:", error);
    // Return a graceful error or empty array
    return [];
  }
}
