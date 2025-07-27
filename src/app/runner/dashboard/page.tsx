"use client";

import { useState, useEffect } from "react";
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
import db, { type DeliveryTask, type DeliveryStatus } from "@/lib/db";

export default function RunnerDashboard() {
  const [tasks, setTasks] = useState<DeliveryTask[]>([]);

  const fetchTasks = () => {
    // Fetch all available tasks that are not yet completed
    setTasks(db.deliveryTasks.findMany().filter(t => t.status !== 'completed'));
  };

  useEffect(() => {
    fetchTasks();
    // Poll for changes to reflect new tasks being created
    const interval = setInterval(fetchTasks, 2000); 
    return () => clearInterval(interval);
  }, []);

  const handleTaskAction = (taskId: string, newStatus: DeliveryStatus) => {
    const updatedTask = db.deliveryTasks.update(taskId, { status: newStatus });
    if(updatedTask) {
       fetchTasks();
    }
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
       {!tasks.length && <p className="text-center text-muted-foreground">No available deliveries right now. Check back soon!</p>}
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
                Delivery Fee: <span className="font-bold text-primary">₹{task.fee.toFixed(2)}</span>
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
