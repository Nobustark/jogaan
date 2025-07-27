"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  CookingPot, 
  LogOut, 
  LayoutDashboard, 
  Package, 
  ListOrdered, 
  BarChart, 
  Wallet, 
  Bike,
  Lightbulb,
  User,
  ShoppingCart
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { UserNav } from "@/components/user-nav";

const iconMap: { [key: string]: LucideIcon } = {
  LayoutDashboard,
  Package,
  ListOrdered,
  BarChart,
  Wallet,
  Bike,
  Lightbulb,
  User,
  ShoppingCart
};


type NavItem = {
  href: string;
  label: string;
  icon: string;
};

type DashboardLayoutProps = {
  children: React.ReactNode;
  navItems: NavItem[];
  role: "vendor" | "supplier" | "runner";
};

export function DashboardLayout({
  children,
  navItems,
  role,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const roleName = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <CookingPot className="w-8 h-8 text-primary" />
              <div className="flex flex-col">
                <h2 className="text-lg font-headline font-semibold">
                  Jogaan Lite
                </h2>
                <p className="text-sm text-muted-foreground">{roleName} Portal</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.label}
                    >
                      <Link href={item.href}>
                        {Icon && <Icon className="h-5 w-5" />}
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-10 flex items-center justify-between h-14 px-4 border-b bg-background/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-xl font-headline font-semibold hidden md:block">
                {navItems.find((item) => item.href === pathname)?.label ||
                  roleName}
              </h1>
            </div>
            <UserNav />
          </header>
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
