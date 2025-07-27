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
import { Eye } from "lucide-react";
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


export default function VendorOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // In a real app, this would be filtered by the logged-in vendor's ID.
    // For now, we'll show orders for "Tasty Tacos Stand"
    setOrders(db.orders.findMany().filter(o => o.vendorName === "Tasty Tacos Stand"));
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
              <TableHead className="text-right">Invoice</TableHead>
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
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" /> View Invoice
                  </Button>
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
