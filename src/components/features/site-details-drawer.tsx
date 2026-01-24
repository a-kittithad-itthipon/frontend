"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { System } from "./site";

type Props = {
  system: System | null;
  onClose: () => void;
};

export function SiteDetailsDrawer({ system, onClose }: Props) {
  return (
    <Sheet open={!!system} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{system?.name}</SheetTitle>
        </SheetHeader>

        {system && (
          <div className="mt-4 space-y-3 text-sm">
            <p>
              <strong>Domain:</strong> {system.domain}
            </p>
            <p>
              <strong>Type:</strong> {system.type}
            </p>
            <p>
              <strong>Owner:</strong> {system.owner}
            </p>
            <p>
              <strong>Status:</strong> {system.status}
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
