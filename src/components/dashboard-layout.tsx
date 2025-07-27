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
import { CookingPot, LogOut } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { UserNav } from "@/components/user-nav";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
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
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      tooltip={item.label}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <SidebarMenuButton>
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </Link>
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
