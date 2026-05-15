import { cn } from "@/lib/utils";
import { Card } from "antd";
import type { ComponentType } from "react";

interface StatCardProps {
  label: string;
  value: string;
  subValue: string;
  subClassName?: string;
  icon?: ComponentType<{ className?: string }>;
  variant?: "default" | "danger" | "warning";
  unit?: string;
}

export function StatCard({
  label,
  value,
  subValue,
  subClassName,
  icon: Icon,
  variant = "default",
  unit,
}: StatCardProps) {
  const valueColor = {
    default: "text-gray-900",
    danger: "text-danger",
    warning: "text-warn",
  }[variant];

  return (
    <Card
      styles={{
        body: {
          padding: "16px 18px",
        },
      }}
    >
      <div>
        <div className="flex justify-between items-start mb-1.5">
          <span className="text-[11.5px] font-medium text-text-3 tracking-widest uppercase ">
            {label}
          </span>

          {Icon && <Icon className="text-gray-400 text-lg" />}
        </div>

        <div className="flex flex-col">
          <div
            className={`text-[22px] font-display font-bold ${valueColor} tracking-tight`}
          >
            {value}
            {unit ? (
              <span className="text-text-3 text-[13px] font-medium">
                &nbsp;{unit}
              </span>
            ) : null}
          </div>

          <span className={cn("text-[11.5px] text-text-3 mt-1", subClassName)}>
            {subValue}
          </span>
        </div>
      </div>
    </Card>
  );
}
