import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

import { FEAT_ITEMS } from "@/constants/hero";

export default function HomePage() {
  return (
    <main className="flex flex-col bg-background">
      {/* ================= HERO ================= */}
      <section className="relative min-h-[60vh] overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/img/w07.jpg)" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/50 to-black/30" />

        <div className="relative z-10 flex min-h-[60vh] items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                Learn
                <br />
                Build
                <br />
                Deploy
              </h1>

              <p className="mt-6 max-w-xl text-base sm:text-lg text-gray-200">
                Manage containers, launch environments, and deploy modern
                websites through a developer-first platform.
              </p>

              <div className="mt-10">
                <Button asChild size="lg" className="text-lg font-semibold">
                  <Link
                    href="https://docs.local"
                    target="_blank"
                    className="inline-flex items-center gap-2"
                  >
                    Get Started
                    <ArrowUpRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12 text-center">
          <div className="mx-auto mb-16 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold">
              Built for Developers
            </h2>
            <p className="mt-4 text-muted-foreground">
              Everything you need to go from idea to production without
              friction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {FEAT_ITEMS.map((item) => (
              <Card
                key={item.title}
                className="group rounded-3xl transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <CardHeader className="items-center text-center gap-4">
                  <div className="flex items-center justify-center transition-colors group-hover:text-foreground">
                    <item.icon size="64" />
                  </div>

                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-muted-foreground">
                    {item.description}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECT SUPPORT =================
      <section className="py-24 bg-muted/40">
        <div className="mx-auto max-w-7xl px-6 md:px-12 text-center">
          <div className="mx-auto mb-16 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold">Project Support</h2>
            <p className="mt-4 text-muted-foreground">
              Build and deploy applications using the technologies we natively
              support.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {PROJECT_LINKS.map(({ title, icon: Icon }) => (
              <Card
                key={title}
                className="rounded-2xl border bg-background transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <CardContent className="flex flex-col items-center justify-center gap-3 py-10">
                  <Icon className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm font-medium">{title}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}
    </main>
  );
}
