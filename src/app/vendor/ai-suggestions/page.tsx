"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Lightbulb, Loader2, Sparkles } from "lucide-react";
import { fetchIngredientSuggestions } from "./actions";
import { IngredientSuggestionsOutput } from "@/ai/flows/ingredient-suggestions";

export default function AiSuggestionsPage() {
  const [suggestions, setSuggestions] = useState<IngredientSuggestionsOutput['suggestions']>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [location, setLocation] = useState("New York, NY");
  const [weather, setWeather] = useState("sunny");
  const [workingHours, setWorkingHours] = useState("11am - 9pm");
  const [dishes, setDishes] = useState("Tacos, Burgers, Fries");


  const handleGetSuggestions = async () => {
    setIsLoading(true);
    setSuggestions([]);
    const result = await fetchIngredientSuggestions({
        location,
        weather,
        workingHours,
        dishes: dishes.split(',').map(d => d.trim()).filter(d => d.length > 0)
    });
    setSuggestions(result.suggestions);
    setIsLoading(false);
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-primary" />
              AI Suggestions
            </CardTitle>
            <CardDescription>
              Tell us your plan to get ingredient recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="location">Your Location</Label>
                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. New York, NY"/>
            </div>
             <div className="space-y-2">
                <Label htmlFor="weather">Current Weather</Label>
                <Select value={weather} onValueChange={setWeather}>
                  <SelectTrigger id="weather">
                    <SelectValue placeholder="Select weather" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sunny">Sunny</SelectItem>
                    <SelectItem value="cloudy">Cloudy</SelectItem>
                    <SelectItem value="rainy">Rainy</SelectItem>
                    <SelectItem value="cold">Cold</SelectItem>
                  </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="hours">Working Hours</Label>
                <Input id="hours" value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} placeholder="e.g. 11am - 9pm"/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="dishes">What dishes will you make?</Label>
                <Textarea id="dishes" value={dishes} onChange={(e) => setDishes(e.target.value)} placeholder="e.g. Tacos, Burgers, Fries"/>
                <p className="text-xs text-muted-foreground">Separate dishes with a comma.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
                onClick={handleGetSuggestions}
                disabled={isLoading}
                className="w-full"
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
          </CardFooter>
        </Card>
      </div>
      <div className="md:col-span-2">
         <Card>
            <CardHeader>
                <CardTitle className="font-headline">
                    Recommended Ingredients
                </CardTitle>
                 <CardDescription>
                    Here's what we think you'll need based on your inputs.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading && (
                    <div className="flex justify-center items-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                    </div>
                )}
                {!isLoading && suggestions.length === 0 && (
                     <p className="text-center text-muted-foreground py-12">Your suggestions will appear here.</p>
                )}
                {suggestions.length > 0 && (
                    <div className="border rounded-md">
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Ingredient</TableHead>
                            <TableHead>Suggested Quantity</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                           {suggestions.map((item, index) => (
                             <TableRow key={index}>
                                <TableCell className="font-medium">{item.ingredient}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                             </TableRow>
                           ))}
                        </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
