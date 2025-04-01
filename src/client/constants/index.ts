import {
  User,
  Folders,
  Workflow,
  View,
  Settings,
  HelpCircle,
  Mail,
  DatabaseIcon,
} from "lucide-react"; // or from your `UseIcons` abstraction
import { DashBoardChartProps } from "@/client/types";

// constants/ServicesOptions.ts
export const ServicesOptions = [
  {
    id: 0,
    title: "Backend Engineering",
    description:
      "Building reliable and scalable server-side systems, APIs, and logic that power modern applications.",
    icon: "/assets/images/backend.svg", // use a relevant icon like a server/cloud
    buttonText: "Learn More",
    href: "/services/backend-engineering",
    tag: "Infrastructure",
  },
  {
    id: 1,
    title: "Database Integration",
    description:
      "Designing efficient data models and integrating relational and NoSQL databases for seamless application performance.",
    icon: "/assets/images/database.svg",
    buttonText: "View Details",
    href: "/services/database-integration",
    tag: "Data Engineering",
  },
  {
    id: 2,
    title: "Web Development",
    description:
      "Building responsive, scalable web applications with modern tech.",
    icon: "/assets/images/html.svg",
    buttonText: "Get Started",
    href: "/services/web-dev",
  },
  {
    id: 3,
    title: "UI/UX Design",
    description: "Crafting intuitive, user-centric designs and prototypes.",
    icon: "/assets/images/code.svg",
    buttonText: "Learn More",
    href: "/services/design",
  },
];

export const FIELD_NAMES = {
  name: "name",
  email: "email",
  password: "password",
};

export const FIELD_TYPES = {
  name: "text",
  email: "email",
  password: "password",
};

export const sideBarNavLinks = [
  { label: "Dashboard", path: "/dashboard", icon: View },
  { label: "Projects", path: "/dashboard/projects", icon: Folders },
  { label: "Workflows", path: "/dashboard/workflows", icon: Workflow },
  { label: "Insights", path: "/dashboard/insights", icon: User },
  { label: "Settings", path: "/dashboard/settings", icon: Settings },
  { label: "Support", path: "/dashboard/support", icon: HelpCircle },
  { label: "Email", path: "/dashboard/email", icon: Mail },
];

// src/client/constants/top-bar-Links.ts
export const TopBarNavLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  {
    label: "Download CV",
    path: "/assets/files/metalCV.pdf",
    download: true,
  },
];

export const profileOptions = [
  { label: "Profile", path: "/dashboard/profile" },
  { label: "Settings", path: "/dashboard/settings" },
];

export const chartConfigs: DashBoardChartProps[] = [
  {
    title: "Revenue Growth",
    chartType: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Revenue",
          data: [1200, 1900, 3000, 2500, 3200],
          backgroundColor: "#4ade80",
          borderColor: "#22c55e",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
    },
  },
  {
    title: "Active Users",
    chartType: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [
        {
          label: "Users",
          data: [200, 400, 380, 500, 600],
          backgroundColor: "#60a5fa",
          borderColor: "#3b82f6",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
    },
  },
  {
    title: "Traffic Source",
    chartType: "area",
    data: {
      labels: ["Direct", "Referral", "Social", "Email"],
      datasets: [
        {
          label: "Traffic",
          data: [800, 600, 400, 200],
          backgroundColor: "#facc15",
          borderColor: "#eab308",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
    },
  },
];
