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
    <section className="border-t bg-muted/40 py-24">
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
              className="group rounded-3xl border bg-background transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardHeader className="flex flex-col items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="h-6 w-6" />
                </div>

                <CardTitle className="text-center">{item.title}</CardTitle>
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
