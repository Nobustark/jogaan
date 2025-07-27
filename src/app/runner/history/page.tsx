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
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import db, { type DeliveryTask } from "@/lib/db";


export default function RunnerHistoryPage() {
  const [deliveries, setDeliveries] = useState<DeliveryTask[]>([]);

  useEffect(() => {
    // Fetch completed deliveries from the database
    const allTasks = db.deliveryTasks.findMany();
    const completedTasks = allTasks.filter(task => task.status === 'completed');
    
    // Add some hardcoded history for demo purposes
    const hardcodedHistory: DeliveryTask[] = [
        {
            id: "hist-1",
            orderId: "ORD-004",
            pickup: "The Meat Locker",
            dropoff: "Burger Bonanza",
            fee: 10.2,
            status: "completed"
        },
        {
            id: "hist-2",
            orderId: "ORD-005",
            pickup: "Spice & Grain Emporium",
            dropoff: "Sizzling Skewers",
            fee: 9.5,
            status: "completed"
        }
    ];

    setDeliveries([...completedTasks, ...hardcodedHistory]);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Delivery History</CardTitle>
        <CardDescription>Review your completed deliveries.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Route</TableHead>
                <TableHead className="text-right">Fee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell className="font-medium">{delivery.orderId}</TableCell>
                  <TableCell>{delivery.pickup} → {delivery.dropoff}</TableCell>
                  <TableCell className="text-right font-medium text-primary">${delivery.fee.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
