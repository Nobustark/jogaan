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
import { ArrowRight, CookingPot, Building, Bike } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="text-center mb-12">
        <div className="inline-block bg-primary p-4 rounded-full mb-4 shadow-lg">
          <CookingPot className="h-12 w-12 text-primary-foreground" />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-foreground font-headline tracking-tighter">
          SastaSupply
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          A smart marketplace connecting street food vendors, suppliers, and
          delivery runners. Streamline your operations and grow your business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
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
            <CardTitle className="font-headline text-2xl">For Vendors</CardTitle>
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
    </main>
  );
}
