"use client";

import { TriangleAlert } from "lucide-react";

export function ApiAlertMsg({ form }: { form: any }) {
  return (
    <>
      {form.formState.errors.root?.message && (
        <div className="flex items-center gap-2 h-9 px-3 py-2 border rounded-md border-destructive/5 bg-destructive/5">
          <TriangleAlert size="16" className="text-destructive" />
          <span className="text-sm text-destructive">
            {form.formState.errors.root.message}
          </span>
        </div>
      )}
    </>
  );
}
