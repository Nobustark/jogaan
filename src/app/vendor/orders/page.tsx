"use client";

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

type OrderStatus = "pending" | "preparing" | "out_for_delivery" | "delivered";

type Order = {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  supplier: string;
};

const orders: Order[] = [
  {
    id: "ORD-001",
    date: "2024-07-28",
    total: 45.75,
    status: "pending",
    supplier: "Green Farms",
  },
  {
    id: "ORD-002",
    date: "2024-07-28",
    total: 88.0,
    status: "preparing",
    supplier: "Spice & Grain",
  },
  {
    id: "ORD-003",
    date: "2024-07-27",
    total: 120.5,
    status: "out_for_delivery",
    supplier: "The Meat Locker",
  },
    {
    id: "ORD-004",
    date: "2024-07-26",
    total: 75.0,
    status: "delivered",
    supplier: "Veggie Co.",
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


export default function VendorOrdersPage() {
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
