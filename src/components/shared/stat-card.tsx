import { Card } from "antd";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  subValue: string;
  icon?: LucideIcon;
  variant?: "default" | "danger" | "warning";
  subClassName?: string;
}

export function StatCard({
  label,
  value,
  subValue,
  icon: Icon,
  variant = "default",
  subClassName,
}: StatCardProps) {
  const valueColor = {
    default: "text-text",
    danger: "text-danger",
    warning: "text-warn",
  }[variant];

  return (
    <Card
      className="rounded! border! border-app-border! bg-card! shadow-none!"
      classNames={{ body: "py-4! px-[18px]!" }}
    >
      <div className={cn("mb-1.5", Icon && "flex items-start justify-between")}>
        <div className="text-[11.5px] font-medium uppercase tracking-[0.04em] text-text-3">
          {label}
        </div>

        {Icon ? <Icon className="text-lg text-gray-400" /> : null}
      </div>

      <div className="flex flex-col">
        <div
          className={cn(
            "font-display text-[22px] font-bold tracking-[-0.01em]",
            valueColor,
          )}
        >
          {value}
        </div>

        <div className={cn("mt-1 text-[11.5px] text-text-3", subClassName)}>
          {subValue}
        </div>
      </div>
    </Card>
  );
}
