"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10 bg-cover bg-center bg-[url(/img/w07.jpg)]" />

      {/* Blue-tinted overlay */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br
        from-slate-900/70
        via-slate-800/50
        to-slate-700/20"
      />

      {/* Bottom fade into next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32
        bg-gradient-to-t from-background to-transparent"
      />

      <div className="mx-auto flex min-h-[75vh] max-w-7xl items-center px-6 md:px-12">
        <div className="max-w-3xl space-y-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Learn.
            <br />
            Build.
            <br />
            Deploy.
          </h1>

          <p className="max-w-xl text-base text-slate-200 sm:text-lg">
            Manage containers, launch environments, and deploy modern
            applications with a platform designed for developers.
          </p>

          <Button
            asChild
            size="lg"
            className="gap-2 bg-white text-slate-900 hover:bg-slate-100"
          >
            <Link href="https://docs.local" target="_blank">
              Get started
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
