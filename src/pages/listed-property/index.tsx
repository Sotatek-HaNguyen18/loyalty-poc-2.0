import { useMemo, useState, type ChangeEvent } from "react";
import { useAccount, useConnect } from "wagmi";
import { ConnectWalletModal } from "./components/ConnectWalletModal";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button, Dropdown } from "antd";
import { ChevronDown, ChevronRight, Plus, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  KindChip,
  StatCard,
  StatusBadge,
  type BadgeVariant,
} from "@/components/shared";
import { cn } from "@/lib/utils";
import { getAssets } from "@/services";
import type { AssetStatus, CategoryType } from "@/types/assets";
import { paths } from "@/routes/paths";
import dayjs from "dayjs";
import { compactHash } from "@/utils/format";
import { computeListedMetrics } from "./utils";
import { listedAssetsQueryKeys } from "./utils/queryKeys";

type SearchForm = {
  search: string;
};

type CategoryFilter = "all" | CategoryType;
type StatusFilter = "all" | AssetStatus;

const categoryFilters: Array<{ label: string; value: CategoryFilter }> = [
  { label: "Tất cả", value: "all" },
  { label: "Vàng", value: "gold" },
  { label: "Bất động sản", value: "real_estate" },
  { label: "Carbon", value: "carbon" },
];

const statusFilters: Array<{ label: string; value: StatusFilter }> = [
  { label: "Tất cả", value: "all" },
  { label: "Đang giao dịch", value: "active" },
  { label: "Đang xử lý", value: "coming_soon" },
];

const PAGE_SIZE = 10;
const STATS_PAGE_SIZE = 100;

const numberFormatter = new Intl.NumberFormat("vi-VN");
const decimalFormatter = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 2,
});

const backingUnitByCategory: Record<
  CategoryType,
  { unit1: string; unit2: string }
> = {
  gold: { unit1: "g", unit2: "chỉ" },
  real_estate: { unit1: "m²", unit2: "tỷ VND" },
  carbon: { unit1: "ha", unit2: "tCO₂e" },
};

const formatPrice = (price: string | number, unit?: string | null) => {
  const numericPrice = Number(price);
  if (Number.isNaN(numericPrice)) return "—";
  return `${numberFormatter.format(numericPrice)} ${unit ?? ""}`;
};

const formatBackingValue = (value: unknown) => {
  const numericValue = Number(value);
  if (value == null || Number.isNaN(numericValue)) return null;
  return decimalFormatter.format(numericValue);
};

const statusLabels: Record<Exclude<StatusFilter, "all">, string> = {
  active: "Đang giao dịch",
  coming_soon: "Đang xử lý",
};

const assetStatusVariant: Record<AssetStatus, BadgeVariant> = {
  active: "success",
  coming_soon: "warning",
};

const assetTypes = [
  {
    description: "SJC · DOJI · PNJ — backed 100% vật chất",
    id: "gold",
    label: "AU",
    title: "Vàng (BGT)",
    color: "bg-gold-50 text-bidv-gold",
  },
  {
    description: "Căn hộ · Văn phòng · Retail — qua SPV",
    id: "real_estate",
    label: "BĐS",
    title: "Bất động sản (BRT)",
    color: "bg-info-bg text-info",
  },
  {
    description: "VCS · Gold Standard — 1 BCT = 1 tCO2e",
    id: "carbon",
    label: "CO₂",
    title: "Carbon Credit (BCT)",
    color: "bg-success-bg text-success",
  },
];

export const ListedPropertyPage = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const { register } = useForm<SearchForm>({
    defaultValues: {
      search: "",
    },
  });
  const searchRegister = register("search");
  const {
    data: assetsResponse,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () =>
      getAssets({
        category: categoryFilter === "all" ? undefined : categoryFilter,
        status: statusFilter === "all" ? undefined : statusFilter,
        search: searchValue.trim() || undefined,
        page,
        limit: PAGE_SIZE,
      }),
    queryKey: [
      ...listedAssetsQueryKeys.all,
      categoryFilter,
      statusFilter,
      searchValue.trim(),
      page,
    ],
    placeholderData: keepPreviousData,
  });

  const { data: statsResponse } = useQuery({
    queryFn: () => getAssets({ page: 1, limit: STATS_PAGE_SIZE }),
    queryKey: listedAssetsQueryKeys.stats,
    staleTime: 60_000,
  });

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setSearchValue(event.target.value);
    void searchRegister.onChange(event);
  };

  const assets = assetsResponse?.items ?? [];
  const metricCards = useMemo(
    () => computeListedMetrics(statsResponse?.items ?? []),
    [statsResponse?.items],
  );

  const paginationMeta = assetsResponse?.meta;
  const totalResults = paginationMeta?.total ?? 0;
  const currentPage = paginationMeta?.page ?? page;
  const pageSize = paginationMeta?.limit ?? PAGE_SIZE;
  const totalPages = paginationMeta?.totalPages ?? 1;
  const rangeStart = totalResults === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, totalResults);
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="mx-auto max-w-[1620px]">
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="mb-1! font-display text-xl font-bold! tracking-[-0.01em] text-text sm:text-[22px]">
            Niêm yết tài sản số
          </h1>
          <p className="mb-0! text-[12.5px] leading-snug text-text-3 sm:text-xsm">
            Module E · Danh sách tài sản đã được tạo on-chain qua AssetRegistry
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            aria-label="Làm mới dữ liệu"
            icon={<RefreshCw size={16} />}
            loading={isLoading}
            onClick={() => void refetch()}
          />
          <Dropdown
            open={dropdownOpen}
            onOpenChange={setDropdownOpen}
            trigger={["click"]}
            popupRender={() => (
              <div className="w-[326px] pb-2 rounded-lg border border-app-border bg-white shadow-lg">
                <div className="px-4 pt-2.5 pb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-text-3">
                  Chọn loại tài sản
                </div>
                <div className="flex flex-col">
                  {assetTypes.map((type) => (
                    <button
                      className="flex w-full items-center gap-3 px-4 py-2.5 transition-colors hover:bg-app-bg cursor-pointer"
                      key={type.id}
                      onClick={() => {
                        setDropdownOpen(false);
                        if (!isConnected) {
                          setShowConnectModal(true);
                          return;
                        }
                        if (type.id === "gold") navigate(paths.listingGold);
                        if (type.id === "real_estate")
                          navigate(paths.listingRealEstate);
                        if (type.id === "carbon") navigate(paths.listingCarbon);
                      }}
                      type="button"
                    >
                      <div
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-[9px] text-[10px] font-bold",
                          type.color,
                        )}
                      >
                        {type.label}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-xsm font-semibold text-text">
                          {type.title}
                        </div>
                        <div className="text-[11px] text-text-3 whitespace-nowrap overflow-hidden text-ellipsis">
                          {type.description}
                        </div>
                      </div>
                      <ChevronRight className="size-[14px] text-text-3" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          >
            <Button
              color="default"
              variant="filled"
              className="bg-bidv-green! text-white! hover:bg-bidv-green-700!"
            >
              <Plus aria-hidden="true" className="h-4 w-4" />
              Tạo niêm yết mới
              <ChevronDown className="ml-1 h-3.5 w-3.5 opacity-60" />
            </Button>
          </Dropdown>
        </div>
      </div>

      <section
        aria-label="Thống kê niêm yết"
        className="grid gap-3 md:grid-cols-2 xl:grid-cols-4"
      >
        {metricCards.map((card) => (
          <StatCard
            key={card.label}
            label={card.label}
            subValue={card.subValue}
            value={card.value}
            unit={card.unit}
          />
        ))}
      </section>

      <section className="mt-5 overflow-hidden rounded-xl border border-app-border bg-white">
        <div className="flex flex-col gap-3 border-b border-app-border px-5 py-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-text">Loại:</span>
            {categoryFilters.map((filter) => (
              <Button
                color="default"
                variant="filled"
                aria-pressed={categoryFilter === filter.value}
                className={`px-2.5! py-1.25! rounded-md text-xs! h-7! font-bold transition-all ${
                  categoryFilter === filter.value
                    ? "bg-bidv-green! text-white!"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                key={filter.value}
                onClick={() => {
                  setPage(1);
                  setCategoryFilter(filter.value);
                }}
              >
                {filter.label}
              </Button>
            ))}
            <div className="mx-1 hidden h-5 w-px bg-app-border md:block" />
            <span className="text-xs font-semibold text-muted-text">
              Trạng thái:
            </span>
            {statusFilters.map((filter) => (
              <Button
                color="default"
                variant="filled"
                aria-pressed={statusFilter === filter.value}
                className={`px-2.5! py-1.25! rounded-md text-xs! h-7! font-bold transition-all ${
                  statusFilter === filter.value
                    ? "bg-bidv-green! text-white!"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                key={filter.value}
                onClick={() => {
                  setPage(1);
                  setStatusFilter(filter.value);
                }}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <label className="relative block sm:hidden">
              <span className="sr-only">Tìm kiếm tài sản</span>
              <input
                className="h-8 w-full rounded-md border border-app-border px-3 text-sm outline-none focus:border-bidv-green"
                placeholder="Tìm kiếm"
                type="search"
                {...searchRegister}
                onChange={handleSearchChange}
              />
            </label>
            <span className="text-sm text-muted-text">
              {totalResults} kết quả
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1360px] border-collapse text-left">
            <thead>
              <tr className="border-b border-app-border bg-bg-alt text-[11.5px] font-semibold uppercase tracking-wide text-text-3">
                <th className="w-[330px] px-4 py-3">Mã &amp; tên tài sản</th>
                <th className="w-[160px] px-4 py-3">Loại</th>
                <th className="w-[150px] px-4 py-3 text-right">
                  Tổng phát hành
                </th>
                <th className="w-[220px] px-4 py-3">Backing thực</th>
                <th className="w-[150px] px-4 py-3 text-right">Giá hiện tại</th>
                <th className="w-[160px] px-4 py-3">Trạng thái</th>
                <th className="w-[150px] px-4 py-3">Niêm yết</th>
                <th className="w-[180px] px-4 py-3">Tx hash</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    className="px-4 py-8 text-center text-sm text-muted-text"
                    colSpan={9}
                  >
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td
                    className="px-4 py-8 text-center text-sm text-[#bd7100]"
                    colSpan={9}
                  >
                    Không tải được dữ liệu.
                  </td>
                </tr>
              ) : (
                assets.map((asset) => (
                  <tr
                    className="border-b border-app-border last:border-b-0"
                    key={asset.id}
                  >
                    <td className="px-4 py-4 align-middle">
                      <div className="font-mono text-xs text-text-2">
                        {asset.tokenCode || asset.id.slice(0, 8)}
                      </div>
                      <div className="mt-0.5 text-xsm font-semibold text-text">
                        {asset.name}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <KindChip
                        label={asset.category.name}
                        type={asset.category.category}
                      />
                    </td>
                    <td className="px-4 py-4 text-right align-middle text-xsm text-text">
                      {asset.totalRelease ? (
                        <>
                          {formatPrice(asset.totalRelease)}{" "}
                          <span className="text-text-3">
                            {asset.tokenCode || "—"}
                          </span>
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-4 align-middle text-xs text-text">
                      {(() => {
                        const backing = formatBackingValue(
                          asset.metadata?.backing_ratio,
                        );
                        const converted = formatBackingValue(
                          asset.metadata?.converted_ratio,
                        );
                        const units =
                          backingUnitByCategory[asset.category.category];

                        if (!backing || !units) return "—";
                        return `${backing}${units.unit1}${
                          converted ? ` · ${converted} ${units.unit2}` : ""
                        }`;
                      })()}
                    </td>
                    <td className="px-4 py-4 text-right align-middle text-xsm text-text">
                      {asset.currentPrice
                        ? formatPrice(asset.currentPrice, asset.priceUnit)
                        : "—"}
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <StatusBadge
                        label={statusLabels[asset.status]}
                        showDot
                        variant={assetStatusVariant[asset.status]}
                      />
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <div className="text-xs text-text">
                        {dayjs(asset.createdAt).isValid()
                          ? dayjs(asset.createdAt).format("DD/MM/YYYY")
                          : "-"}
                      </div>
                      <div className="font-mono text-xs text-muted-text">
                        admin.bidv.eth
                      </div>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      {asset.txHash ? (
                        <a
                          className="font-mono! text-xs! text-bidv-green! underline! decoration-dotted!"
                          href={`https://polygonscan.com/tx/${asset.txHash}`}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {compactHash(asset.txHash)}
                        </a>
                      ) : (
                        <span className="text-xs text-text">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 px-5 py-3 text-sm text-muted-text sm:flex-row sm:items-center sm:justify-between">
          <span>
            Hiển thị {rangeStart}–{rangeEnd} / {totalResults} kết quả
          </span>
          <div className="flex gap-2">
            <Button
              className="h-8! rounded-md! border-app-border! text-xs!"
              disabled={!canGoPrev || isLoading}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            >
              Trang trước
            </Button>
            <Button
              className="h-8! rounded-md! border-app-border! text-xs!"
              disabled={!canGoNext || isLoading}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Trang sau
            </Button>
          </div>
        </div>
      </section>
      <ConnectWalletModal
        open={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        onConnect={() => connect({ connector: connectors[0] })}
      />
    </div>
  );
};
