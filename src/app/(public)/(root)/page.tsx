import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { FEAT_ITEMS, PROJECT_LINKS } from "@/constants/public";
import { ArrowUpRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex flex-col gap-28 px-4 md:px-8 lg:px-16">
      {/* ================= HERO ================= */}
      <section className="relative isolate overflow-hidden rounded-3xl h-[70vh] md:h-[80vh] bg-[url(/img/w07.jpg)] bg-cover bg-center shadow-xl">
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/50 to-black/30" />

        <div className="relative z-10 flex h-full items-center">
          <div className="max-w-3xl px-6 md:px-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              Learn
              <br />
              Build
              <br />
              Deploy
            </h1>

            <p className="mt-6 text-base sm:text-lg text-gray-200 max-w-xl">
              Manage containers, launch environments, and deploy modern websites
              through a developer-first platform.
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
      </section>

      {/* ================= FEATURES ================= */}
      <section className="text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Built for Developers
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to go from idea to production without friction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {FEAT_ITEMS.map((item) => (
            <Card
              key={item.title}
              className="group rounded-3xl transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <CardHeader className="items-center text-center gap-4">
                {item.iconClass && (
                  <i
                    className={`${item.iconClass} text-4xl text-muted-foreground transition-colors group-hover:text-foreground`}
                    aria-hidden="true"
                  />
                )}

                <CardTitle>{item.title}</CardTitle>

                {item.description && (
                  <CardDescription>{item.description}</CardDescription>
                )}
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= PROJECT SUPPORT ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-12 text-center">
          <div className="max-w-3xl mx-auto mb-16">
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
                className="rounded-2xl border bg-background transition-all hover:shadow-md hover:-translate-y-1"
              >
                <CardContent className="flex flex-col items-center justify-center gap-3 py-10">
                  <Icon className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm font-medium">{title}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
