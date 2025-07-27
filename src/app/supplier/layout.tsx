import { DashboardLayout } from "@/components/dashboard-layout";
import { Chatbot } from "@/components/chatbot";

const navItems = [
  { href: "/supplier/dashboard", label: "Listings", icon: "Package" },
  { href: "/supplier/orders", label: "Incoming Orders", icon: "ListOrdered" },
];

export default function SupplierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout navItems={navItems} role="supplier">
      {children}
      <Chatbot />
    </DashboardLayout>
  );
}
