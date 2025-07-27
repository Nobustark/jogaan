import { DashboardLayout } from "@/components/dashboard-layout";
import { LayoutDashboard, Package, ListOrdered, BarChart } from "lucide-react";

const navItems = [
  { href: "/supplier/dashboard", label: "Listings", icon: Package },
  { href: "/supplier/orders", label: "Incoming Orders", icon: ListOrdered },
  { href: "/supplier/analytics", label: "Analytics", icon: BarChart },
];

export default function SupplierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout navItems={navItems} role="supplier">{children}</DashboardLayout>;
}
