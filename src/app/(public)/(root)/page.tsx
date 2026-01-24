import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { FEAT_ITEMS } from "@/constants/hero";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-background">
      {/* ================= HERO ================= */}
      <section className="relative isolate overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: "url(/img/w07.jpg)" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-black/80 via-black/60 to-black/40" />

        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center px-6 md:px-12">
          <div className="max-w-3xl space-y-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Learn.
              <br />
              Build.
              <br />
              Deploy.
            </h1>

            <p className="max-w-xl text-base text-gray-200 sm:text-lg">
              Manage containers, launch environments, and deploy modern
              applications with a platform designed for developers.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="text-lg">
                <Link href="https://docs.local" target="_blank">
                  Get started
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline">
                <Link href="/site-lists">View deployments</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Built for developers
            </h2>
            <p className="mt-4 text-muted-foreground">
              Everything you need to go from idea to production — without
              friction.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {FEAT_ITEMS.map((item) => (
              <Card
                key={item.title}
                className="group rounded-3xl border bg-background transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <CardHeader className="items-center gap-4 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted transition-colors group-hover:bg-primary/10">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>

                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-center">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="border-t bg-muted/40 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h3 className="text-2xl font-semibold md:text-3xl">
            Ready to deploy your next project?
          </h3>
          <p className="mt-4 text-muted-foreground">
            Start building and shipping faster with Adocs.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Contact us</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="https://docs.local" target="_blank">
                Read the docs
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
