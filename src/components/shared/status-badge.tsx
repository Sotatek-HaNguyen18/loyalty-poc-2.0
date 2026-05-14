import type { StatusBadgeType } from "@/pages/batch-reconciliation/types";

const getStatusType = (status: string) => {
  switch (status) {
    case "Khớp":
    case "Mint":
      return "success";
    case "Lệch":
    case "Burn":
      return "danger";
    case "Đang xử lý":
      return "warning";
    case "Transfer":
      return "info";
    case "On-chain":
      return "success";
    case "Off-chain":
      return "warning";
    default:
      break;
  }
};
export const StatusBadge = ({ value }: { value: string }) => {
  const status = getStatusType(value);

  const styles =
    {
      success: "bg-success-bg text-success",
      danger: "bg-danger-bg text-danger",
      warning: "bg-warn-bg text-warn",
      info: "bg-info-bg text-info",
    }[status as StatusBadgeType] || "bg-gray-100 text-gray-700 border-gray-200";

  const dot =
    {
      success: "bg-success",
      danger: "bg-danger",
      warning: "bg-warn",
      info: "bg-info",
    }[status as StatusBadgeType] || "bg-gray-500";

  return (
    <span
      className={`px-2 py-0.5 rounded-xs text-[11px] font-semibold flex items-center gap-1.5 w-fit ${styles}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
      {value}
    </span>
  );
};
