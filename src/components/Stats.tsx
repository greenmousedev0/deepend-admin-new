import type { StatCardProps } from "@/components/StatCard";
import StatCard from "@/components/StatCard";
import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
  ShoppingCart,
  BarChart,
  TrendingUp,
  Clock,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    color: "#a16207",
    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    subtitle: "+20.1% from last month",
    main: "$45,231.89",
  },
  {
    title: "Subscriptions",
    color: "brown",
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
    subtitle: "+180.1% from last month",
    main: "+2350",
  },
  {
    title: "Sales",
    color: "green",
    icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
    subtitle: "+19% from last month",
    main: "+12,234",
  },
  {
    title: "Active Now",
    color: "#c2410c",
    icon: <Activity className="h-4 w-4 text-muted-foreground" />,
    subtitle: "+201 since last hour",
    main: "+573",
  },
  {
    title: "Orders",
    color: "#0e7490",
    icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
    subtitle: "+15% from last month",
    main: "1,234",
  },
  {
    title: "Page Views",
    color: "mediumpurple",
    icon: <BarChart className="h-4 w-4 text-muted-foreground" />,
    subtitle: "+10% from last month",
    main: "56,789",
  },
  {
    title: "Conversion Rate",
    color: "blue",
    icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
    subtitle: "+2.5% from last month",
    main: "4.5%",
  },
  {
    title: "Average Session",
    color: "brown",
    icon: <Clock className="h-4 w-4 text-muted-foreground" />,
    subtitle: "+5% from last month",
    main: "00:05:30",
  },
] satisfies StatCardProps[];

export default function Stats() {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </div>
  );
}
