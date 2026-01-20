import {
  Rocket,
  Settings,
  ShieldCheck,
  Layers,
  Container,
  Database,
  LayoutDashboard,
  Server,
} from "lucide-react";

export const FEAT_ITEMS = [
  {
    title: "Fast Deployment",
    description:
      "Launch your apps quickly with zero configuration and automated builds.",
    icon: Rocket,
  },
  {
    title: "Container Management",
    description:
      "Easily start, stop, and monitor all your Docker containers in one dashboard.",
    icon: Settings,
  },
  {
    title: "Secure",
    description:
      "Built-in security and monitoring to protect your apps and data.",
    icon: ShieldCheck,
  },
  {
    title: "Custom Environments",
    description:
      "Configure environments to match your development and production needs.",
    icon: Layers,
  },
];

export const PROJECT_LINKS = [
  {
    title: "Next.js",
    icon: LayoutDashboard,
  },
  {
    title: "Node.js",
    icon: Server,
  },
  {
    title: "PostgreSQL",
    icon: Database,
  },
  {
    title: "Docker",
    icon: Container,
  },
];
