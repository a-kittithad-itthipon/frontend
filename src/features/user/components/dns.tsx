"use client";

import { TriangleAlert } from "lucide-react";
import { useState } from "react";

type Field = "containerName" | "port" | "domain";

interface ValidationResult {
  valid: boolean;
  message?: string;
}

const validateContainerName = (value: string): ValidationResult => {
  if (value.includes(" "))
    return { valid: false, message: "Container Name: Space not allowed" };

  if (value !== value.toLowerCase())
    return { valid: false, message: "Container Name: Uppercase not allowed" };

  if (value.length > 50)
    return { valid: false, message: "Container Name: Max 50 characters" };

  if (!/^[a-z0-9-_]+$/.test(value))
    return { valid: false, message: "Container Name: Invalid characters" };

  return { valid: true };
};

const validatePort = (value: string): ValidationResult => {
  if (!/^\d+$/.test(value))
    return { valid: false, message: "Port: Only numbers allowed" };

  if (value.length > 5) return { valid: false, message: "Port: Max 5 digits" };

  const port = Number(value);
  if (port < 1 || port > 65535)
    return { valid: false, message: "Port: Range 1–65535" };

  return { valid: true };
};

const validateDomain = (value: string): ValidationResult => {
  if (value.includes(" "))
    return { valid: false, message: "Domain: Space not allowed" };

  if (value !== value.toLowerCase())
    return { valid: false, message: "Domain: Uppercase not allowed" };

  if (value.length > 25)
    return { valid: false, message: "Domain: Max 25 characters" };

  if (!/^[a-z0-9-_.]+$/.test(value))
    return { valid: false, message: "Domain: Invalid characters" };

  return { valid: true };
};

export default function Upload() {
  const [containerName, setContainerName] = useState("");
  const [port, setPort] = useState("");
  const [domain, setDomain] = useState("");

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    field: Field,
    value: string,
    validator: (v: string) => ValidationResult,
    setter: (v: string) => void
  ) => {
    const result = validator(value);

    if (!result.valid) {
      setError(result.message ?? "Invalid value");
      return;
    }

    setError(null);
    setter(value);
  };

  return (
    <main className="flex h-full justify-center items-center">
      <div className="w-[90%] h-[90%] border rounded-3xl flex flex-col">
        <div className="h-[10%] flex justify-center items-center text-2xl font-semibold">
          Add Local DNS
        </div>

        <div className="flex-1 flex justify-center">
          <form id="file_zip_form" className="w-[80%] flex flex-col gap-6 pt-5">
            {/* Container + Port */}
            <div className="flex gap-3">
              <div className="w-[65%]">
                <p>Container Name</p>
                <input
                  className="input"
                  placeholder="Enter container name"
                  value={containerName}
                  onChange={(e) =>
                    handleChange(
                      "containerName",
                      e.target.value,
                      validateContainerName,
                      setContainerName
                    )
                  }
                />
              </div>

              <div className="w-[35%]">
                <p>Port</p>
                <input
                  className="input"
                  placeholder="1 - 65535"
                  value={port}
                  onChange={(e) =>
                    handleChange("port", e.target.value, validatePort, setPort)
                  }
                />
              </div>
            </div>

            {/* Domain */}
            <div className="flex gap-3">
              <div className="w-[65%]">
                <p>Domain Name</p>
                <input
                  className="input"
                  placeholder="Domain name"
                  value={domain}
                  onChange={(e) =>
                    handleChange(
                      "domain",
                      e.target.value,
                      validateDomain,
                      setDomain
                    )
                  }
                />
              </div>

              <div className="w-[35%]">
                <p>Root Domain</p>
                <input className="input bg-gray-100" value=".local" readOnly />
              </div>
            </div>
          </form>
        </div>

        {/* Error */}
        <div className="h-[15%] flex items-center px-10 text-red-500 gap-2">
          {error && (
            <>
              <TriangleAlert />
              <span>{error}</span>
            </>
          )}
        </div>

        {/* Submit */}
        <div className="h-[20%] flex justify-center items-center">
          <button
            type="submit"
            form="file_zip_form"
            disabled={!!error}
            className="w-[30%] h-15 bg-sky-500 text-white rounded-full hover:bg-sky-700 transition disabled:opacity-50"
          >
            Add Local DNS
          </button>
        </div>
      </div>
    </main>
  );
}
