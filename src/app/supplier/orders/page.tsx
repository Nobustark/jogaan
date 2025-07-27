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
import { Check, Truck } from "lucide-react";
import db, { type Order, type OrderStatus } from "@/lib/db";

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


export default function SupplierOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = () => {
     // Hardcoded for prototype, assuming current supplier is "Veggie Co."
     setOrders(db.orders.findMany().filter(o => o.supplier === 'Veggie Co.'));
  };

  useEffect(() => {
    fetchOrders();
    // Poll for changes to reflect updates from other parts of the app
    const interval = setInterval(fetchOrders, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
     db.orders.update(orderId, { status: newStatus });
     fetchOrders();

     if (newStatus === 'out_for_delivery') {
         const order = db.orders.findMany().find(o => o.id === orderId);
         if (order) {
            db.deliveryTasks.create({
                orderId: order.id,
                pickup: order.supplier,
                dropoff: order.vendorName,
                fee: Math.round(order.total * 0.15 * 100) / 100, // 15% delivery fee
                status: 'pending'
            });
         }
     }
  };


  return (
     <Card>
      <CardHeader>
        <CardTitle className="font-headline">Incoming Orders</CardTitle>
        <CardDescription>Manage and track orders from vendors.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.vendorName}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>₹{order.total.toFixed(2)}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right space-x-2">
                   {order.status === "pending" && (
                     <Button size="sm" onClick={() => handleUpdateStatus(order.id, 'preparing')}>
                       <Check className="mr-2 h-4 w-4" /> Accept
                     </Button>
                   )}
                   {order.status === "preparing" && (
                     <Button size="sm" onClick={() => handleUpdateStatus(order.id, 'out_for_delivery')}>
                       <Truck className="mr-2 h-4 w-4" /> Ship Order
                     </Button>
                   )}
                   {order.status === 'out_for_delivery' && (
                     <Button size="sm" disabled>Awaiting Delivery</Button>
                   )}
                   {order.status === 'delivered' && (
                      <Button size="sm" disabled>Completed</Button>
                   )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </CardContent>
    </Card>
  );
}
