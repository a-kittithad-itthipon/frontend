"use client";

export function UserHeader({ username }: { username: string }) {
  return (
    <div className="h-14 top-0 z-30 sticky px-4 md:px-6 border-b bg-background flex items-center justify-between">
      <p className="truncate">Welcome, {username}</p>
      {/* Optional: add profile pic / actions here */}
    </div>
  );
}
