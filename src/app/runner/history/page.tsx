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
    const fetchHistory = () => {
        // Fetch completed deliveries from the database
        const allTasks = db.deliveryTasks.findMany();
        const completedTasks = allTasks.filter(task => task.status === 'completed');
        setDeliveries(completedTasks);
    };
    fetchHistory();
     // Poll for changes to reflect updates from other parts of the app
    const interval = setInterval(fetchHistory, 2000);
    return () => clearInterval(interval);
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
                  <TableCell className="text-right font-medium text-primary">₹{delivery.fee.toFixed(2)}</TableCell>
                </TableRow>
              ))}
               {!deliveries.length && (
                <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">No completed deliveries yet.</TableCell>
                </TableRow>
               )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
