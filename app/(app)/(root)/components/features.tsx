"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FEAT_ITEMS } from "@/constants/app";

export function Features() {
  return (
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
  );
}
