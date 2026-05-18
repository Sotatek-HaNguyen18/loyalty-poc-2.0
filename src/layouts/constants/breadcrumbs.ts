import { paths } from "@/routes/paths";

const breadcrumbByPath: Record<string, string[]> = {
  [paths.batchReconciliation]: ["Module B", "Đối soát batch"],
  [paths.listedProperty]: ["Module E", "Niêm yết tài sản"],
  [paths.listingGold]: ["Module E", "Niêm yết tài sản", "Niêm yết Vàng"],
  [paths.listingRealEstate]: [
    "Module E",
    "Niêm yết tài sản",
    "Niêm yết Bất động sản",
  ],
  [paths.listingCarbon]: ["Module E", "Niêm yết tài sản", "Niêm yết Carbon"],
  [paths.pricing]: ["Module C", "Cập nhật giá"],
};

export const getHeaderBreadcrumbs = (pathname: string) =>
  breadcrumbByPath[pathname] ?? ["Tổng quan"];
