"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CookingPot } from "lucide-react";

type LoginFormProps = {
  role: "vendor" | "supplier" | "runner";
};

export function LoginForm({ role }: LoginFormProps) {
  const router = useRouter();
  const roleName = role.charAt(0).toUpperCase() + role.slice(1);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/${role}/dashboard`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm mx-4 shadow-2xl rounded-2xl">
        <CardHeader className="text-center">
          <div className="inline-block mx-auto bg-primary p-3 rounded-full mb-4 shadow-lg">
            <CookingPot className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="font-headline text-2xl">{roleName} Login</CardTitle>
          <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full" size="lg">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
