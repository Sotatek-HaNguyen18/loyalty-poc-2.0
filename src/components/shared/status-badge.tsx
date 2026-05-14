import clsx from "clsx";

export type BadgeVariant = "success" | "danger" | "warning" | "info" | "green" | "orange" | "red" | "blue" | "yellow" | "grey" | "gold";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  showDot?: boolean;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  success: "bg-success-bg text-success",
  danger: "bg-danger-bg text-danger",
  warning: "bg-warn-bg text-warn",
  info: "bg-info-bg text-info",

  green: "bg-primary-50 text-bidv-green",
  orange: "bg-amber-50 text-amber-700",
  red: "bg-rose-50 text-rose-600",
  blue: "bg-indigo-50 text-indigo-600",
  yellow: "bg-yellow-50 text-yellow-700",
  grey: "bg-app-bg text-text-2",
  gold: "bg-gold-50 text-bidv-gold",
};

const dots: Record<BadgeVariant, string> = {
  success: "bg-success",
  danger: "bg-danger",
  warning: "bg-warn",
  info: "bg-info",

  green: "bg-emerald-500",
  orange: "bg-amber-500",
  red: "bg-rose-500",
  blue: "bg-indigo-500",
  yellow: "bg-yellow-500",
  grey: "bg-text-2",
  gold: "",
};

export const StatusBadge = ({ label, variant = "green", showDot = false, className }: BadgeProps) => {
  return (
    <span className={clsx("inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-semibold", variants[variant])}>
      {showDot && <span className={clsx("h-1.5 w-1.5 rounded-full", dots[variant])} />}

      <span className={className}>{label}</span>
    </span>
  );
};
