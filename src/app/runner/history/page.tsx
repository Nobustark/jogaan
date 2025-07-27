import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

type Delivery = {
  id: string;
  orderId: string;
  date: string;
  pickup: string;
  dropoff: string;
  fee: number;
};

const deliveries: Delivery[] = [
  {
    id: "1",
    orderId: "ORD-004",
    date: "2024-07-26",
    pickup: "The Meat Locker",
    dropoff: "Burger Bonanza",
    fee: 10.2,
  },
  {
    id: "2",
    orderId: "ORD-005",
    date: "2024-07-25",
    pickup: "Spice & Grain Emporium",
    dropoff: "Sizzling Skewers",
    fee: 9.5,
  },
  {
    id: "3",
    orderId: "ORD-006",
    date: "2024-07-24",
    pickup: "Farm Fresh Vegetables",
    dropoff: "Tasty Tacos Stand",
    fee: 11.0,
  },
];

export default function RunnerHistoryPage() {
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
                <TableHead>Date</TableHead>
                <TableHead>Route</TableHead>
                <TableHead className="text-right">Fee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell className="font-medium">{delivery.orderId}</TableCell>
                  <TableCell>{delivery.date}</TableCell>
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
