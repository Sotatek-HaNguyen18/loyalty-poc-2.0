import { paths } from "@/routes/paths";

const breadcrumbByPath: Record<string, string[]> = {
  [paths.batchReconciliation]: ["Module B", "Đối soát batch"],
  [paths.listedProperty]: ["Module E", "Niêm yết tài sản"],
  [paths.pricing]: ["Module C", "Cập nhật giá"],
};

export const getHeaderBreadcrumbs = (pathname: string) =>
  breadcrumbByPath[pathname] ?? ["Tổng quan"];
