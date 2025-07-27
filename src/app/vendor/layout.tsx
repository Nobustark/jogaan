
import { DashboardLayout } from "@/components/dashboard-layout";
import { CartProvider } from "@/hooks/use-cart";
import { Chatbot } from "@/components/chatbot";

const navItems = [
  { href: "/vendor/dashboard", label: "Browse", icon: "LayoutDashboard" },
  { href: "/vendor/ai-suggestions", label: "AI Suggestions", icon: "Lightbulb" },
  { href: "/vendor/cart", label: "Cart", icon: "ShoppingCart" },
  { href: "/vendor/orders", label: "Order History", icon: "ListOrdered" },
  { href: "/vendor/profile", label: "Profile", icon: "User" },
];

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <DashboardLayout navItems={navItems} role="vendor">
        {children}
        <Chatbot />
      </DashboardLayout>
    </CartProvider>
  );
}
