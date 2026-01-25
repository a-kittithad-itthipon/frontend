"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10 bg-cover bg-center bg-[url(/img/w07.jpg)]" />

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
  );
}
