"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit, PlusCircle, Trash2, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import db, { type Product } from '@/lib/db';

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ))}
      {halfStar && <Star key="half" className="w-4 h-4 text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
};

export default function SupplierDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newProductName, setNewProductName] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductQuantity, setNewProductQuantity] = useState("");

  const fetchProducts = () => {
    // For this prototype, we assume the supplier is "Veggie Co."
    // In a real app, you'd get this from the user's session.
    setProducts(db.products.findMany().filter(p => p.supplier === 'Veggie Co.'));
  }

  useEffect(() => {
    fetchProducts();
  }, []);


  const handleAddProduct = () => {
    if (!newProductName || !newProductPrice || !newProductQuantity) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill in all required product details.",
      });
      return;
    }

    db.products.create({
      name: newProductName,
      price: parseFloat(newProductPrice),
      quantity: parseInt(newProductQuantity, 10),
      description: newProductDescription,
      imageUrl: "https://placehold.co/400x400.png",
      supplier: 'Veggie Co.', // Hardcoded for prototype
      rating: 0,
      reviews: [],
    });

    fetchProducts();
    
    // Reset fields and close dialog
    setNewProductName("");
    setNewProductDescription("");
    setNewProductPrice("");
    setNewProductQuantity("");
    setDialogOpen(false);
    
    toast({
      title: "Product Added",
      description: `${newProductName} has been added to your listings.`,
    });
  };

  const handleDeleteProduct = (productId: string) => {
    db.products.delete(productId);
    fetchProducts();
    toast({
        title: "Product Deleted",
        description: "The product has been removed from your listings.",
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold font-headline">Your Listings</h1>
            <p className="text-muted-foreground">Manage your product inventory here.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-headline">Add New Product</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new product to your inventory.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" placeholder="Product Name" className="col-span-3" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea id="description" placeholder="Describe your product" className="col-span-3" value={newProductDescription} onChange={(e) => setNewProductDescription(e.target.value)} />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">Price (₹)</Label>
                <Input id="price" type="number" placeholder="800.00" className="col-span-3" value={newProductPrice} onChange={(e) => setNewProductPrice(e.target.value)} />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">Quantity</Label>
                <Input id="quantity" type="number" placeholder="100" className="col-span-3" value={newProductQuantity} onChange={(e) => setNewProductQuantity(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddProduct}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="rounded-md object-cover"
                    data-ai-hint="food ingredient"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                   <div className="flex items-center gap-1">
                     <StarRating rating={product.rating} /> 
                     <span className="text-xs text-muted-foreground">({product.reviews.length})</span>
                   </div>
                </TableCell>
                <TableCell>₹{product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant="outline">{product.quantity} in stock</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="mr-2" disabled>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteProduct(product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
