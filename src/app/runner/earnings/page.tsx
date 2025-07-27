"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { TrendingUp } from "lucide-react";
import db, { type DeliveryTask } from "@/lib/db";
import { subDays, format } from "date-fns";


const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function RunnerEarningsPage() {
  const [completedTasks, setCompletedTasks] = useState<DeliveryTask[]>([]);
  
  useEffect(() => {
    const fetchTasks = () => {
        // In a real app, you'd fetch this from your backend for the logged in user
        const allTasks = db.deliveryTasks.findMany();
        setCompletedTasks(allTasks.filter(t => t.status === 'completed'));
    }
    fetchTasks();
    const interval = setInterval(fetchTasks, 2000);
    return () => clearInterval(interval);
  }, []);

  const totalEarnings = completedTasks.reduce((acc, curr) => acc + curr.fee, 0);
  const deliveriesThisWeek = completedTasks.length; // Simplified for demo
  const averageFee = deliveriesThisWeek > 0 ? totalEarnings / deliveriesThisWeek : 0;

  // Chart data from last 7 days
  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), i);
    const dateString = format(date, "yyyy-MM-dd");
    const earnings = completedTasks
      .filter(task => task.date === dateString)
      .reduce((sum, task) => sum + task.fee, 0);
    return { date: dateString, amount: earnings };
  }).reverse();
  

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Total Earnings</CardDescription>
            <CardTitle className="font-headline text-4xl">₹{totalEarnings.toFixed(2)}</CardTitle>
          </CardHeader>
        </Card>
         <Card>
          <CardHeader>
            <CardDescription>Deliveries This Week</CardDescription>
            <CardTitle className="font-headline text-4xl">{deliveriesThisWeek}</CardTitle>
          </CardHeader>
        </Card>
         <Card>
          <CardHeader>
            <CardDescription>Average Fee</CardDescription>
            <CardTitle className="font-headline text-4xl">₹{averageFee.toFixed(2)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center">
            <TrendingUp className="mr-2 h-5 w-5"/> Weekly Earnings
          </CardTitle>
          <CardDescription>Your earnings over the last 7 days.</CardDescription>
        </CardHeader>
        <CardContent>
           <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="amount" fill="var(--color-earnings)" radius={4} />
              </BarChart>
            </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Recent Completed Deliveries</CardTitle>
           <CardDescription>Your recent completed deliveries.</CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead className="text-right">Fee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedTasks.slice(0, 5).map(task => (
                 <TableRow key={task.id}>
                    <TableCell>{task.date}</TableCell>
                    <TableCell>{task.orderId}</TableCell>
                    <TableCell className="text-right">₹{task.fee.toFixed(2)}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
