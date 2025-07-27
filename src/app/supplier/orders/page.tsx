"use client";

import { useState } from "react";
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

type OrderStatus = "pending" | "preparing" | "out_for_delivery" | "delivered";

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
};

type Order = {
  id: string;
  vendorName: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
};

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    vendorName: "Tasty Tacos Stand",
    date: "2024-07-28",
    total: 45.75,
    status: "pending",
    items: [
      { id: "1", name: "Fresh Tomatoes", quantity: 5 },
      { id: "2", name: "Onions", quantity: 10 },
    ],
  },
  {
    id: "ORD-002",
    vendorName: "Noodle Nirvana",
    date: "2024-07-28",
    total: 88.0,
    status: "preparing",
    items: [
      { id: "3", name: "Basmati Rice", quantity: 2 },
      { id: "6", name: "Canola Oil (5L)", quantity: 1 },
    ],
  },
  {
    id: "ORD-003",
    vendorName: "Sizzling Skewers",
    date: "2024-07-27",
    total: 120.5,
    status: "out_for_delivery",
    items: [{ id: "4", name: "Chicken Breast (kg)", quantity: 10 }],
  },
    {
    id: "ORD-004",
    vendorName: "Burger Bonanza",
    date: "2024-07-26",
    total: 75.0,
    status: "delivered",
    items: [{ id: "p-onion", name: "Onions", quantity: 5 }, { id: 'p-tomato', name: 'Tomatoes', quantity: 5}],
  },
];

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
  }
};


export default function SupplierOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
     setOrders(orders.map(o => o.id === orderId ? {...o, status: newStatus} : o));
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
                <TableCell>${order.total.toFixed(2)}</TableCell>
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
