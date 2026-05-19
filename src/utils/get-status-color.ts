import type { BadgeVariant } from "@/components/shared";

export const getStatusVariant = (status: string): BadgeVariant => {
  switch (status) {
    case "Khớp":
    case "Mint":
    case "Đang giao dịch":
    case "Äang giao dá»‹ch":
      return "success";

    case "Lệch":
    case "Burn":
    case "Năng động":
    case "NÄƒng Ä‘á»™ng":
      return "danger";

    case "Đang xử lý":
    case "Äang xá»­ lÃ½":
    case "Trung bình":
    case "Trung bÃ¬nh":
      return "warning";

    case "Transfer":
    case "Thận trọng":
    case "Tháº­n trá»ng":
      return "info";

    case "VIP":
      return "gold";

    case "Level 2":
      return "green";

    default:
      return "grey";
  }
};
