import { Card } from "antd";

interface StatCardProps {
  label: string;
  value: string;
  subValue: string;
  icon?: any;
  variant?: "default" | "danger" | "warning";
}

export function StatCard({ label, value, subValue, icon: Icon, variant = "default" }: StatCardProps) {
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
      }}>
      <div>
        <div className="flex justify-between items-start mb-1.5">
          <span className="text-[11.5px] font-medium text-text-3 tracking-widest uppercase ">{label}</span>

          {Icon && <Icon className="text-gray-400 text-lg" />}
        </div>

        <div className="flex flex-col">
          <span className={`text-[22px] font-bold ${valueColor} tracking-tight`}>{value}</span>

          <span className="text-[11.5px] text-text-3 mt-1">{subValue}</span>
        </div>
      </div>
    </Card>
  );
}
