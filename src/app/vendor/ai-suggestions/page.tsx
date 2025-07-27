"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Loader2, Sparkles } from "lucide-react";
import { fetchIngredientSuggestions } from "./actions";

export default function AiSuggestionsPage() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetSuggestions = async () => {
    setIsLoading(true);
    setSuggestions([]);
    const result = await fetchIngredientSuggestions();
    setSuggestions(result);
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          <Sparkles className="mr-2 h-6 w-6 text-primary" />
          AI Ingredient Suggestions
        </CardTitle>
        <CardDescription>
          Get smart recommendations based on your order history and current market trends.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="mb-6">
          <Button
            onClick={handleGetSuggestions}
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Lightbulb className="mr-2 h-4 w-4" />
                Generate Suggestions
              </>
            )}
          </Button>
        </div>

        {suggestions.length > 0 && (
          <div>
            <h3 className="text-xl font-headline font-semibold mb-4">Here are some suggestions for you:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {suggestions.map((item, index) => (
                <Card key={index} className="p-4 bg-secondary/50">
                  <p className="font-semibold text-secondary-foreground">{item}</p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
