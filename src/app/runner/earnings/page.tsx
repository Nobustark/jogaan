"use client"

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
import { TrendUp } from "lucide-react";

const recentEarnings = [
  { date: "2024-07-22", amount: 45.50 },
  { date: "2024-07-23", amount: 52.30 },
  { date: "2024-07-24", amount: 65.10 },
  { date: "2024-07-25", amount: 48.90 },
  { date: "2024-07-26", amount: 72.00 },
  { date: "2024-07-27", amount: 58.60 },
  { date: "2024-07-28", amount: 75.40 },
]

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function RunnerEarningsPage() {
  const totalEarnings = recentEarnings.reduce((acc, curr) => acc + curr.amount, 0);

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
            <CardTitle className="font-headline text-4xl">34</CardTitle>
          </CardHeader>
        </Card>
         <Card>
          <CardHeader>
            <CardDescription>Average Fee</CardDescription>
            <CardTitle className="font-headline text-4xl">${(totalEarnings / 34).toFixed(2)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center">
            <TrendUp className="mr-2 h-5 w-5"/> Weekly Earnings
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
