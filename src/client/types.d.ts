export interface IUser {
  id: string;
  name: string | null;
  email: string;
  password: string;
  role: "SUPERADMIN" | "ADMIN" | "USER";
  isVerified: boolean;
  ipAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SignUpProps {
  name: string;
  email: string;
  password: string;
  role?: "SUPERADMIN" | "ADMIN" | "USER";
  isVerified?: "true" | "false";
}

export interface SignInProps {
  email: string;
  password: string;
}

export interface FirebaseSignInProps {
  idToken: string;
}

export interface ICsrfService {
  generateToken(reply: any): string;
  validateToken(req: any): boolean;
}

export interface ChartDataItem {
  name: string;
  [key: string]: string | number;
}

export type ChartType = "bar" | "line" | "area" | "pie" | "radar";

export interface ChartConfig {
  type: ChartType;
  title: string;
  data: ChartDataItem[];
  xKey: string;
  yKeys: string[];
  colors?: string[];
}

export interface DashboardChartCardProps {
  config: ChartConfig;
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface DashBoardChartProps {
  title: string;
  data: ChartData;
  options: Record<string, any>;
  chartType: "bar" | "line" | "area";
}

export interface LinkScrollProps {
  title: string;
  to: string;
  onClick?: () => void;
}

export interface ToggleButtonProps {
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
  className?: string;
}

export interface SendEmailProps {
  to: string;
  subject: string;
  body: string;
  link?: string;
}
