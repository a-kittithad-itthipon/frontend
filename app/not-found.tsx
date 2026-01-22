import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="flex flex-col items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <AlertTriangle className="h-10 w-10 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
          <p className="text-muted-foreground">
            Sorry, the page you’re looking for doesn’t exist or was moved.
          </p>
        </div>

        <Button asChild>
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Go back home
          </Link>
        </Button>
      </div>
    </div>
  );
}
