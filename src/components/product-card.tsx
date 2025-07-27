import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/lib/db";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

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


export function ProductCard({ product }: { product: Product }) {
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 hover:shadow-xl rounded-lg group flex flex-col">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint="food ingredient"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline mb-1">{product.name}</CardTitle>
        <p className="text-sm text-muted-foreground">from {product.supplier}</p>
        
        <div className="flex items-center gap-2 mt-2">
            <StarRating rating={product.rating} />
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="link" className="text-xs p-0 h-auto" disabled={product.reviews.length === 0}>
                       ({product.reviews.length} reviews)
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reviews for {product.name}</DialogTitle>
                        <DialogDescription>See what other vendors are saying.</DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[60vh] overflow-y-auto pr-4 space-y-4">
                        {product.reviews.map((review, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold">{review.vendorName}</p>
                                    <StarRating rating={review.rating}/>
                                </div>
                                <p className="text-muted-foreground text-sm mt-1">{review.comment}</p>
                                {index < product.reviews.length - 1 && <Separator className="mt-4"/>}
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>

        <p className="text-xl font-bold font-headline text-primary mt-2">
          ₹{product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
