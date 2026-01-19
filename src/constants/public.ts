import { Container, Database, LayoutDashboard, Server } from "lucide-react";

export const FEAT_ITEMS = [
  {
    title: "Fast Deployment",
    description:
      "Launch your apps quickly with zero configuration and automated builds.",
    iconClass: "bx bxs-rocket",
  },
  {
    title: "Container Management",
    description:
      "Easily start, stop, and monitor all your Docker containers in one dashboard.",
    iconClass: "bx bxs-cog",
  },
  {
    title: "Secure",
    description:
      "Built-in security and monitoring to protect your apps and data.",
    iconClass: "bx bxs-shield",
  },
  {
    title: "Custom Environments",
    description:
      "Configure environments to match your development and production needs.",
    iconClass: "bx bxs-layer",
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
