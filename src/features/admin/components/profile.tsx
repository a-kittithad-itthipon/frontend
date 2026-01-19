"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function Profile() {
  const [userData, setUserData] = useState({
    username: "Loading...",
    email: "Loading...",
    database: "Loading...",
  });

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/profile");
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();

        setUserData({
          username: data.username || "No Username",
          email: data.email || "No Email",
          database: data.database ? "Connected" : "Not Connected",
        });
      } catch {
        setUserData({
          username: "Error",
          email: "Error",
          database: "Error",
        });
        toast.error("Failed to load profile");
      }
    };

    fetchData();
  }, []);

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password === newPassword) {
      toast.warning("New password must be different");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Updating password...");

    try {
      const res = await fetch("/api/re_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong", { id: toastId });
        return;
      }

      toast.success(data.message, { id: toastId });
      setPassword("");
      setNewPassword("");
    } catch {
      toast.error("Server error", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const FieldRow = ({
    label,
    children,
    statusColor,
  }: {
    label: string;
    children: React.ReactNode;
    statusColor?: string;
  }) => (
    <div className="border flex items-stretch rounded-xl bg-muted overflow-hidden">
      <Label className="w-1/4 px-4 py-3 border-r border-border flex items-center font-medium">
        {label}
      </Label>
      <div className="flex-1 bg-background px-4 py-3">
        <span className={cn("font-normal", statusColor)}>{children}</span>
      </div>
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          id="re_password"
          onSubmit={changePassword}
          className="flex flex-col gap-4 md:gap-6"
        >
          {/* Profile Info */}
          <FieldRow label="Username">{userData.username}</FieldRow>
          <FieldRow label="Email">{userData.email}</FieldRow>
          <FieldRow
            label="Database"
            statusColor={
              userData.database === "Connected"
                ? "text-green-600"
                : "text-red-500"
            }
          >
            {userData.database}
          </FieldRow>

          {/* Password Fields */}
          <FieldRow label="Old Password">
            <Input
              type="password"
              required
              placeholder="Enter old password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="border-none rounded-none ring-0 focus-visible:ring-0 w-full shadow-none p-0"
            />
          </FieldRow>

          <FieldRow label="New Password">
            <Input
              type="password"
              required
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
              className="border-none rounded-none ring-0 focus-visible:ring-0 w-full shadow-none p-0"
            />
          </FieldRow>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button
          type="submit"
          form="re_password"
          disabled={loading}
          className="cursor-pointer"
          size="lg"
        >
          {loading ? "Updating..." : "Change Password"}
        </Button>
      </CardFooter>
    </Card>
  );
}
