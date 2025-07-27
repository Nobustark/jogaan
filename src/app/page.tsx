import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CookingPot,
  Building,
  Bike,
  Bot,
  Lightbulb,
  Package,
  Truck,
} from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="text-center mb-16 pt-16">
        <div className="inline-block bg-primary p-4 rounded-full mb-4 shadow-lg">
          <CookingPot className="h-12 w-12 text-primary-foreground" />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-foreground font-headline tracking-tighter">
          Welcome to SastaSupply
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          The smart, AI-powered marketplace connecting street food vendors,
          suppliers, and delivery runners. Streamline your operations, get
          intelligent suggestions, and grow your business with a single,
          easy-to-use platform.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/vendor/login">Get Started</Link>
          </Button>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto mb-24">
        <h2 className="text-4xl font-bold text-center mb-12 font-headline">
          A Platform for Everyone
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="flex flex-col transform hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-2xl rounded-xl">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-secondary rounded-full mb-2">
                <Building className="h-8 w-8 text-secondary-foreground" />
              </div>
              <CardTitle className="font-headline text-2xl">
                For Suppliers
              </CardTitle>
              <CardDescription>
                Manage your inventory, reach more vendors, and grow your sales.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow"></CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/supplier/login">
                  Supplier Portal <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col transform hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-2xl rounded-xl border-2 border-primary">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary rounded-full mb-2">
                <CookingPot className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="font-headline text-2xl">
                For Vendors
              </CardTitle>
              <CardDescription>
                Order fresh ingredients, discover new items with AI, and track
                your deliveries.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow"></CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/vendor/login">
                  Vendor Portal <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col transform hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-2xl rounded-xl">
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-secondary rounded-full mb-2">
                <Bike className="h-8 w-8 text-secondary-foreground" />
              </div>
              <CardTitle className="font-headline text-2xl">
                For Runners
              </CardTitle>
              <CardDescription>
                Find delivery jobs, optimize your routes, and manage your
                earnings efficiently.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow"></CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/runner/login">
                  Runner Portal <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto mb-24 text-center">
        <h2 className="text-4xl font-bold font-headline mb-4">Key Features</h2>
        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
          Everything you need to run your street food business more efficiently.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-card p-6 rounded-lg border">
            <Lightbulb className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-bold font-headline text-xl mb-2">
              AI-Powered Suggestions
            </h3>
            <p className="text-muted-foreground">
              Get smart ingredient recommendations based on your menu, location,
              and even the weather.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <Package className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-bold font-headline text-xl mb-2">
              Seamless Ordering
            </h3>
            <p className="text-muted-foreground">
              Browse a wide catalog of fresh ingredients and place orders with
              just a few clicks.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <Truck className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-bold font-headline text-xl mb-2">
              Real-Time Tracking
            </h3>
            <p className="text-muted-foreground">
              Track your orders from the supplier to your stall and get live
              updates on your delivery.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center w-full max-w-4xl p-8 bg-card rounded-2xl shadow-lg border mb-16">
        <div className="inline-block bg-primary text-primary-foreground p-4 rounded-full mb-4 shadow-lg">
          <Bot className="h-10 w-10" />
        </div>
        <h2 className="text-3xl font-bold font-headline text-foreground">
          Meet SastaBot, Your AI Assistant
        </h2>
        <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
          Get instant answers to your questions, receive smart ingredient
          suggestions, and manage your operations more efficiently with our
          friendly AI-powered chatbot, available 24/7.
        </p>
        <Button size="lg" className="mt-6" asChild>
          <Link href="/vendor/login">Get Started with SastaBot</Link>
        </Button>
      </div>
    </main>
  );
}
