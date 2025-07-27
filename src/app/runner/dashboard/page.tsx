"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Truck, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type DeliveryStatus = "pending" | "in_progress" | "completed";

type DeliveryTask = {
  id: string;
  orderId: string;
  pickup: string;
  dropoff: string;
  status: DeliveryStatus;
  fee: number;
};

const initialTasks: DeliveryTask[] = [
  {
    id: "1",
    orderId: "ORD-001",
    pickup: "Central Wholesale Market",
    dropoff: "Tasty Tacos Stand",
    status: "pending",
    fee: 12.5,
  },
  {
    id: "2",
    orderId: "ORD-002",
    pickup: "Spice & Grain Emporium",
    dropoff: "Noodle Nirvana",
    status: "pending",
    fee: 8.75,
  },
  {
    id: "3",
    orderId: "ORD-003",
    pickup: "Farm Fresh Vegetables",
    dropoff: "Sizzling Skewers",
    status: "in_progress",
    fee: 15.0,
  },
   {
    id: "4",
    orderId: "ORD-004",
    pickup: "The Meat Locker",
    dropoff: "Burger Bonanza",
    status: "completed",
    fee: 10.20,
  },
];

export default function RunnerDashboard() {
  const [tasks, setTasks] = useState<DeliveryTask[]>(initialTasks);

  const handleTaskAction = (taskId: string, newStatus: DeliveryStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const getStatusBadge = (status: DeliveryStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "in_progress":
        return <Badge variant="default" className="bg-blue-500">In Progress</Badge>;
      case "completed":
        return <Badge variant="default" className="bg-green-600">Completed</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <Card key={task.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="font-headline text-xl">
                  Order #{task.orderId}
                </CardTitle>
                {getStatusBadge(task.status)}
              </div>
              <CardDescription>
                Delivery Fee: <span className="font-bold text-primary">${task.fee.toFixed(2)}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="flex items-center gap-4">
                <div className="font-semibold">{task.pickup}</div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                <div className="font-semibold">{task.dropoff}</div>
              </div>
            </CardContent>
            <CardFooter>
              {task.status === "pending" && (
                <Button
                  className="w-full"
                  onClick={() => handleTaskAction(task.id, "in_progress")}
                >
                  <Truck className="mr-2 h-4 w-4" /> Accept Delivery
                </Button>
              )}
              {task.status === "in_progress" && (
                <Button
                  className="w-full"
                  onClick={() => handleTaskAction(task.id, "completed")}
                >
                  <CheckCircle className="mr-2 h-4 w-4" /> Mark as Complete
                </Button>
              )}
              {task.status === "completed" && (
                <Button className="w-full" disabled>
                   Delivery Completed
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
