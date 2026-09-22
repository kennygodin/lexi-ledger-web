import { Cell, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatNaira } from "@/lib/money";
import type { CategoryBreakdown } from "../types/dashboard.types";
import type { TransactionCategory } from "@/features/transactions/types/transactions.types";

// Fixed order — matches the validated adjacent-pair sequence in the
// categorical palette. Do not sort this by value.
const CATEGORY_ORDER: TransactionCategory[] = [
  "food",
  "transport",
  "rent",
  "utilities",
  "subscriptions",
  "income",
  "entertainment",
  "shopping",
  "other",
];

const chartConfig = {
  food: { label: "Food", theme: { light: "#2a78d6", dark: "#3987e5" } },
  transport: {
    label: "Transport",
    theme: { light: "#eb6834", dark: "#d95926" },
  },
  rent: { label: "Rent", theme: { light: "#1baf7a", dark: "#199e70" } },
  utilities: {
    label: "Utilities",
    theme: { light: "#eda100", dark: "#c98500" },
  },
  subscriptions: {
    label: "Subscriptions",
    theme: { light: "#e87ba4", dark: "#d55181" },
  },
  income: { label: "Income", theme: { light: "#008300", dark: "#008300" } },
  entertainment: {
    label: "Entertainment",
    theme: { light: "#4a3aa7", dark: "#9085e9" },
  },
  shopping: { label: "Shopping", theme: { light: "#e34948", dark: "#e66767" } },
  other: { label: "Other", theme: { light: "#c3c2b7", dark: "#383835" } },
} satisfies ChartConfig;

interface CategoryBreakdownChartProps {
  data: CategoryBreakdown[];
}

export function CategoryBreakdownChart({ data }: CategoryBreakdownChartProps) {
  const present = new Set(data.map((entry) => entry.category));
  const rows = CATEGORY_ORDER.filter((category) => present.has(category)).map(
    (category) => data.find((entry) => entry.category === category)!,
  );

  if (rows.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
        No category data for this period yet.
      </div>
    );
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-56"
    >
      <PieChart>
        <ChartTooltip
          content={
            <ChartTooltipContent
              hideLabel
              formatter={(value, _name, item) => (
                <div className="flex w-full items-center justify-between gap-4">
                  <span className="text-muted-foreground">
                    {
                      chartConfig[item.payload.category as TransactionCategory]
                        .label
                    }
                  </span>
                  <span className="font-mono font-medium text-foreground">
                    {formatNaira(value as number)}
                  </span>
                </div>
              )}
            />
          }
        />
        <Pie
          data={rows}
          dataKey="total"
          nameKey="category"
          innerRadius={45}
          outerRadius={75}
          paddingAngle={2}
        >
          {rows.map((entry) => (
            <Cell
              key={entry.category}
              fill={`var(--color-${entry.category})`}
            />
          ))}
        </Pie>
        <ChartLegend content={<ChartLegendContent nameKey="category" />} />
      </PieChart>
    </ChartContainer>
  );
}
