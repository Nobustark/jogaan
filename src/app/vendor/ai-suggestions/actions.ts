"use server";

import { getIngredientSuggestions, IngredientSuggestionsInput } from '@/ai/flows/ingredient-suggestions';

export async function fetchIngredientSuggestions() {
  // In a real application, this data would be dynamic.
  // For location, you could use the browser's Geolocation API.
  // For weather, you would call a weather API.
  // For working hours, you would fetch the vendor's profile.
  const mockInput: IngredientSuggestionsInput = {
    vendorId: 'vendor-123',
    location: 'New York, NY',
    weather: 'Sunny, 85°F',
    workingHours: '11am - 9pm',
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
