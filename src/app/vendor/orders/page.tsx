"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import db, { type Order, type OrderStatus } from "@/lib/db";
import { useToast } from "@/hooks/use-toast";

const getStatusBadge = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return <Badge variant="secondary">Pending</Badge>;
    case "preparing":
      return <Badge>Preparing</Badge>;
    case "out_for_delivery":
      return <Badge className="bg-blue-500">Out for Delivery</Badge>;
    case "delivered":
      return <Badge className="bg-green-600">Delivered</Badge>;
    case "completed":
        return <Badge className="bg-green-600">Completed</Badge>;
  }
};

const ReviewDialog = ({ order, onReviewSubmit }: { order: Order, onReviewSubmit: () => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState("");
    const { toast } = useToast();

    const handleSubmitReview = () => {
        if (rating === 0) {
            toast({
                variant: "destructive",
                title: "No rating selected",
                description: "Please select a star rating to submit your review.",
            });
            return;
        }

        db.orders.addReview(order.id, { rating, comment: review });

        toast({
            title: "Review Submitted",
            description: "Thank you for your feedback!",
        });
        setIsOpen(false);
        onReviewSubmit();
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline" disabled={order.reviewSubmitted}>
                    {order.reviewSubmitted ? "Review Submitted" : "Leave a Review"}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Leave a review for order #{order.id}</DialogTitle>
                    <DialogDescription>
                        Your feedback helps suppliers improve their service.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div>
                        <Label>Rating</Label>
                        <div className="flex items-center gap-1 mt-2">
                             {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-6 h-6 cursor-pointer transition-colors ${
                                        (hoverRating || rating) >= star
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300"
                                    }`}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setRating(star)}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="review">Comments</Label>
                        <Textarea id="review" value={review} onChange={(e) => setReview(e.target.value)} placeholder="Tell us about your experience..."/>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmitReview}>Submit Review</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


export default function VendorOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = () => {
    // In a real app, this would be filtered by the logged-in vendor's ID.
    // For now, we'll show orders for "Tasty Tacos Stand"
    setOrders(db.orders.findMany().filter(o => o.vendorName === "Tasty Tacos Stand"));
  };

  useEffect(() => {
    fetchOrders();
    // Poll for changes to reflect updates from other parts of the app
    const interval = setInterval(fetchOrders, 2000); 
    return () => clearInterval(interval);
  }, []);

  return (
     <Card>
      <CardHeader>
        <CardTitle className="font-headline">Order History</CardTitle>
        <CardDescription>Track your past and current orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                 <TableCell>{order.supplier}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">
                  {order.status === 'delivered' && <ReviewDialog order={order} onReviewSubmit={fetchOrders} />}
                </TableCell>
              </TableRow>
            ))}
             {!orders.length && (
                <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">You haven't placed any orders yet.</TableCell>
                </TableRow>
             )}
          </TableBody>
        </Table>
        </div>
      </CardContent>
    </Card>
  );
}
