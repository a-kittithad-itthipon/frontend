import { Users, Upload, Activity, HeartPulse } from "lucide-react";

export const SYSTEM_STATS = [
  {
    title: "Total Users",
    value: 1245,
    icon: Users,
    description: "+12 this week",
  },
  {
    title: "Total Uploads",
    value: 328,
    icon: Upload,
    description: "+8 today",
  },
  {
    title: "Containers",
    icon: Activity,
    running: 3,
    stopped: 1,
  },
  {
    title: "System Health",
    icon: HeartPulse,
    href: "/system/health",
  },
];
