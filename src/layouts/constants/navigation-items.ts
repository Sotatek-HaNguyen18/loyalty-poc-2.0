import { ArrowRightLeft, Grid2X2, List, UserRound } from "lucide-react";

export const navigationItems = [
  { badge: undefined, icon: Grid2X2, id: "overview", label: "Tổng quan" },
  { badge: "E", icon: List, id: "listed-property", label: "Niêm yết tài sản" },
  {
    badge: "B",
    icon: ArrowRightLeft,
    id: "batch-reconciliation",
    label: "Đối soát batch",
  },
  {
    badge: "A",
    icon: UserRound,
    id: "kyc",
    label: "Quản lý KYC",
  },
];
