
"use client";

import { Input } from "@/components/ui/input";
import { ProductCard, type Product } from "@/components/product-card";
import { Search } from "lucide-react";
import { CartProvider } from "@/hooks/use-cart";

const products: Product[] = [
  { id: "1", name: "Fresh Tomatoes", price: 2.50, imageUrl: "https://placehold.co/600x400.png", supplier: "Green Farms" },
  { id: "2", name: "Red Onions", price: 1.75, imageUrl: "https://placehold.co/600x400.png", supplier: "Veggie Co." },
  { id: "3", name: "Basmati Rice (20kg)", price: 15.00, imageUrl: "https://placehold.co/600x400.png", supplier: "Spice & Grain" },
  { id: "4", name: "Chicken Breast (kg)", price: 8.50, imageUrl: "https://placehold.co/600x400.png", supplier: "The Meat Locker" },
  { id: "5", name: "Garam Masala", price: 5.25, imageUrl: "https://placehold.co/600x400.png", supplier: "Spice & Grain" },
  { id: "6", name: "Canola Oil (5L)", price: 22.00, imageUrl: "https://placehold.co/600x400.png", supplier: "Veggie Co." },
  { id: "7", name: "Potatoes (bag)", price: 4.50, imageUrl: "https://placehold.co/600x400.png", supplier: "Green Farms" },
  { id: "8", name: "All-Purpose Flour", price: 6.00, imageUrl: "https://placehold.co/600x400.png", supplier: "Spice & Grain" },
];

export default function VendorDashboard() {
  return (
    <CartProvider>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline">Browse Ingredients</h1>
          <p className="text-muted-foreground">Find the best ingredients for your dishes.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search for ingredients..." className="pl-10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </CartProvider>
  );
}
