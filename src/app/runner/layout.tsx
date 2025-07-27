import { DashboardLayout } from "@/components/dashboard-layout";
import { Chatbot } from "@/components/chatbot";

const navItems = [
  { href: "/runner/dashboard", label: "Available Deliveries", icon: "Bike" },
  { href: "/runner/history", label: "Delivery History", icon: "ListOrdered" },
  { href: "/runner/earnings", label: "Earnings", icon: "Wallet" },
];

export default function RunnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout navItems={navItems} role="runner">
      {children}
      <Chatbot />
    </DashboardLayout>
  );
}
