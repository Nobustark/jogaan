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


const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function RunnerEarningsPage() {
  const [completedTasks, setCompletedTasks] = useState<DeliveryTask[]>([]);
  
  useEffect(() => {
    // In a real app, you'd fetch this from your backend for the logged in user
    const allTasks = db.deliveryTasks.findMany();
    const hardcodedHistory: DeliveryTask[] = [
        { id: "hist-1", orderId: "ORD-004", pickup: "", dropoff: "", fee: 10.2, status: "completed" },
        { id: "hist-2", orderId: "ORD-005", pickup: "", dropoff: "", fee: 9.5, status: "completed" }
    ];
    setCompletedTasks([...allTasks.filter(t => t.status === 'completed'), ...hardcodedHistory]);
  }, []);

  const totalEarnings = completedTasks.reduce((acc, curr) => acc + curr.fee, 0);
  const deliveriesThisWeek = completedTasks.length; // Simplified for demo
  const averageFee = deliveriesThisWeek > 0 ? totalEarnings / deliveriesThisWeek : 0;

  // Mock chart data
  const recentEarnings = [
    { date: "2024-07-22", amount: 45.50 },
    { date: "2024-07-23", amount: 52.30 },
    { date: "2024-07-24", amount: 65.10 },
    { date: "2024-07-25", amount: 48.90 },
    { date: "2024-07-26", amount: 72.00 },
    { date: "2024-07-27", amount: 58.60 },
    { date: "2024-07-28", amount: totalEarnings > 75 ? totalEarnings : 75.40 }, // Use real data if available
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Total Earnings</CardDescription>
            <CardTitle className="font-headline text-4xl">${totalEarnings.toFixed(2)}</CardTitle>
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
            <CardTitle className="font-headline text-4xl">${averageFee.toFixed(2)}</CardTitle>
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
              <BarChart accessibilityLayer data={recentEarnings}>
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
          <CardTitle className="font-headline">Recent Payouts</CardTitle>
           <CardDescription>Your recent earnings transfers.</CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>2024-07-25</TableCell>
                <TableCell>Direct Deposit</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
               <TableRow>
                <TableCell>2024-07-18</TableCell>
                <TableCell>Direct Deposit</TableCell>
                <TableCell className="text-right">$235.50</TableCell>
              </TableRow>
               <TableRow>
                <TableCell>2024-07-11</TableCell>
                <TableCell>Direct Deposit</TableCell>
                <TableCell className="text-right">$261.20</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
