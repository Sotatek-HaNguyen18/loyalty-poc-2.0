import type { BadgeVariant } from "@/components/shared";

export const getStatusVariant = (status: string): BadgeVariant => {
  switch (status) {
    case "Khớp":
    case "Mint":
    case "Đang giao dịch":
      return "success";

    case "Lệch":
    case "Burn":
    case "Năng động":
      return "danger";

    case "Đang xử lý":
    case "Trung bình":
      return "warning";

    case "Transfer":
    case "Thận trọng":
      return "info";

    case "VIP":
      return "gold";

    case "Level 2":
      return "green";

    default:
      return "grey";
  }
};
