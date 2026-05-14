import { useMemo, useState, type ChangeEvent } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ConnectWalletModal } from "./components/ConnectWalletModal";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button, Dropdown } from "antd";
import {
  ChevronDown,
  ChevronRight,
  Download,
  Eye,
  Pause,
  Play,
  Plus,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { AssetStatus, ListedAsset } from "@/types/assets";
import { compactHash } from "@/utils/format";
import { paths } from "@/routes/paths";

type SearchForm = {
  search: string;
};

type CategoryFilter = "all" | "gold" | "real-estate" | "carbon";
type StatusFilter = "all" | AssetStatus;

const metricCards = [
  {
    label: "Tổng niêm yết",
    value: "6",
    meta: "5 active · 1 paused · 1 draft",
  },
  {
    label: "Vàng (BGT)",
    value: "3",
    unit: "lô",
    meta: "Tổng: 17.500g · 466,66 chỉ",
  },
  {
    label: "BĐS (BRT)",
    value: "2",
    unit: "dự án",
    meta: "Tổng giá trị: 370 tỷ VND",
  },
  {
    label: "Carbon (BCT)",
    value: "1",
    unit: "đợt",
    meta: "50.000 tCO₂e · Vintage 2025",
  },
];

const categoryFilters: Array<{ label: string; value: CategoryFilter }> = [
  { label: "Tất cả", value: "all" },
  { label: "Vàng", value: "gold" },
  { label: "Bất động sản", value: "real-estate" },
  { label: "Carbon", value: "carbon" },
];

const statusFilters: Array<{ label: string; value: StatusFilter }> = [
  { label: "Tất cả", value: "all" },
  { label: "Đang giao dịch", value: "trading" },
  { label: "Tạm dừng", value: "paused" },
  { label: "Nháp", value: "draft" },
];

const listedAssets: ListedAsset[] = [
  {
    action: "pause",
    backing: "5.000g · 133,33 chỉ",
    category: "gold",
    categoryLabel: "Vàng",
    currentPrice: "950.000 đ",
    id: "GOLD-20260512-001",
    issued: "13.333",
    listedDate: "12/05/2026",
    name: "Vàng SJC 9999 — Lô 5/2026",
    owner: "admin.bidv.eth",
    status: "trading",
    txHash: "0x7c5b8a9177cdd12519342b82f0400ecfe3f2",
    unit: "BGT",
  },
  {
    action: "pause",
    backing: "10.000g · 266,66 chỉ",
    category: "gold",
    categoryLabel: "Vàng",
    currentPrice: "948.500 đ",
    id: "GOLD-20260415-002",
    issued: "26.666",
    listedDate: "15/04/2026",
    name: "Vàng SJC 9999 — Lô 4/2026",
    owner: "admin.bidv.eth",
    status: "trading",
    txHash: "0x4b9c2def91a221654e916c923e63a18d",
    unit: "BGT",
  },
  {
    action: "pause",
    backing: "2.500m² · 250 tỷ VND",
    category: "real-estate",
    categoryLabel: "Bất động sản",
    currentPrice: "2.500.000 đ",
    id: "RE-2026-001",
    issued: "100.000",
    listedDate: "08/04/2026",
    name: "Vinhomes Ocean Park 3 — Tòa T15",
    owner: "admin.bidv.eth",
    status: "trading",
    txHash: "0xa92f7c1b10492375d62fe72b184d84e",
    unit: "BRT",
  },
  {
    action: "resume",
    backing: "1.200m² · 120 tỷ VND",
    category: "real-estate",
    categoryLabel: "Bất động sản",
    currentPrice: "2.400.000 đ",
    id: "RE-2026-002",
    issued: "50.000",
    listedDate: "02/03/2026",
    name: "Masteri Centre Point — Tầng 12",
    owner: "admin.bidv.eth",
    status: "paused",
    txHash: "0x83bc41fe2273154f31a98cddfcba77a0",
    unit: "BRT",
  },
  {
    action: "pause",
    backing: "200ha · VERRA VCS-1234",
    category: "carbon",
    categoryLabel: "Carbon Credit",
    currentPrice: "120.000 đ",
    id: "CC-2026-001",
    issued: "50.000",
    listedDate: "20/03/2026",
    name: "Rừng ngập mặn Cà Mau — Vintage 2025",
    owner: "admin.bidv.eth",
    status: "trading",
    txHash: "0xd44e8b7cd517249fba69ac76a00a91",
    unit: "BCT",
  },
  {
    action: "continue",
    backing: "2.500g · 66,66 chỉ",
    category: "gold",
    categoryLabel: "Vàng",
    id: "GOLD-20260520-003",
    issued: "6.666",
    name: "Vàng SJC 9999 — Lô 6/2026 (Draft)",
    status: "draft",
    unit: "BGT",
  },
];

const statusStyles: Record<AssetStatus, string> = {
  draft: "bg-[#eef1f0] text-[#46514d]",
  paused: "bg-[#fff0d8] text-[#bd7100]",
  trading: "bg-[#dff2e8] text-[#00875a]",
};

const statusLabels: Record<AssetStatus, string> = {
  draft: "Nháp",
  paused: "Tạm dừng",
  trading: "Đang giao dịch",
};

const categoryStyles = {
  carbon: "bg-[#25865b] text-white",
  gold: "bg-bidv-gold text-white",
  "real-estate": "bg-[#2e75c7] text-white",
};

const categoryShortLabels = {
  carbon: "CO₂",
  gold: "V",
  "real-estate": "BĐS",
};

const assetTypes = [
  {
    description: "SJC · DOJI · PNJ — backed 100% vật chất",
    id: "gold",
    label: "AU",
    title: "Vàng (BGT)",
    color: "bg-[#fbf4e4] text-[#8a6f00]",
  },
  {
    description: "Căn hộ · Văn phòng · Retail — qua SPV",
    id: "real-estate",
    label: "BĐS",
    title: "Bất động sản (BRT)",
    color: "bg-[#eff4fc] text-[#2e75c7]",
  },
  {
    description: "VCS · Gold Standard — 1 BCT = 1 tCO2e",
    id: "carbon",
    label: "CO₂",
    title: "Carbon Credit (BCT)",
    color: "bg-[#e9f4ef] text-[#25865b]",
  },
];

const getListedAssets = async () => {
  return listedAssets;
};

export const ListedPropertyPage = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchValue, setSearchValue] = useState("");
  const { register } = useForm<SearchForm>({
    defaultValues: {
      search: "",
    },
  });
  const searchRegister = register("search");
  const { data = [] } = useQuery({
    queryFn: getListedAssets,
    queryKey: ["listed-assets"],
  });

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    void searchRegister.onChange(event);
  };

  const filteredAssets = useMemo(() => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();

    return data.filter((asset) => {
      const matchesCategory =
        categoryFilter === "all" || asset.category === categoryFilter;
      const matchesStatus =
        statusFilter === "all" || asset.status === statusFilter;
      const searchableText =
        `${asset.id} ${asset.name} ${asset.txHash ?? ""} ${asset.owner ?? ""}`.toLowerCase();
      const matchesSearch = searchableText.includes(normalizedSearchValue);

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [categoryFilter, data, searchValue, statusFilter]);

  return (
    <div className="mx-auto max-w-[1620px]">
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-normal text-[#07130f]">
            Niêm yết tài sản số
          </h1>
          <p className="mt-2 text-sm text-muted-text">
            Module E · Danh sách tài sản đã được tạo on-chain qua AssetRegistry
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            className="!inline-flex !h-10 !items-center !gap-2 !rounded-md !border-app-border !font-semibold"
            icon={<Download aria-hidden="true" className="h-4 w-4" />}
          >
            Xuất CSV
          </Button>
          <Button
            aria-label="Làm mới dữ liệu"
            className="!inline-flex !h-10 !w-10 !items-center !justify-center !rounded-md !border-app-border !p-0"
            icon={<RefreshCw aria-hidden="true" className="h-4 w-4" />}
          />
          <Dropdown
            open={dropdownOpen}
            onOpenChange={setDropdownOpen}
            trigger={["click"]}
            dropdownRender={() => (
              <div className="w-[420px] rounded-2xl border border-app-border bg-white p-6 shadow-[0_18px_55px_rgba(8,31,20,0.1)]">
                <div className="mb-4 text-xs font-extrabold uppercase tracking-[0.14em] text-[#81938c]">
                  Chọn loại tài sản
                </div>
                <div className="space-y-1">
                  {assetTypes.map((type) => (
                    <button
                      className="flex w-full items-center gap-4 rounded-xl p-2 transition-colors hover:bg-[#f7f9f8]"
                      key={type.id}
                      onClick={() => {
                        setDropdownOpen(false);
                        if (!isConnected) {
                          setShowConnectModal(true);
                          return;
                        }
                        if (type.id === "gold") navigate(paths.listingGold);
                        if (type.id === "real-estate")
                          navigate(paths.listingRealEstate);
                        if (type.id === "carbon") navigate(paths.listingCarbon);
                      }}
                      type="button"
                    >
                      <div
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold",
                          type.color,
                        )}
                      >
                        {type.label}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-base font-bold text-[#06120f]">
                          {type.title}
                        </div>
                        <div className="text-sm font-normal text-[#81938c]">
                          {type.description}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-[#ccd6d1]" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          >
            <Button
              className="!inline-flex !h-10 !items-center !gap-2 !rounded-md !font-semibold"
              type="primary"
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
          <article
            className="rounded-lg border border-app-border bg-white p-5"
            key={card.label}
          >
            <div className="text-xs font-bold uppercase tracking-wide text-muted-text">
              {card.label}
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-2xl font-bold leading-none">
                {card.value}
              </span>
              {card.unit ? (
                <span className="text-sm text-muted-text">{card.unit}</span>
              ) : null}
            </div>
            <div className="mt-3 text-xs text-muted-text">{card.meta}</div>
          </article>
        ))}
      </section>

      <section className="mt-5 overflow-hidden rounded-xl border border-app-border bg-white">
        <div className="flex flex-col gap-3 border-b border-app-border px-5 py-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-text">Loại:</span>
            {categoryFilters.map((filter) => (
              <Button
                aria-pressed={categoryFilter === filter.value}
                className={cn(
                  "!h-8 !rounded-md !border-0 !px-3 !text-xs !font-semibold",
                  categoryFilter === filter.value
                    ? "!bg-bidv-green !text-white"
                    : "!bg-[#edf1ef] !text-[#4f5f59]",
                )}
                key={filter.value}
                onClick={() => setCategoryFilter(filter.value)}
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
                aria-pressed={statusFilter === filter.value}
                className={cn(
                  "!h-8 !rounded-md !border-0 !px-3 !text-xs !font-semibold",
                  statusFilter === filter.value
                    ? "!bg-bidv-green !text-white"
                    : "!bg-[#edf1ef] !text-[#4f5f59]",
                )}
                key={filter.value}
                onClick={() => setStatusFilter(filter.value)}
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
              {filteredAssets.length} kết quả
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1360px] border-collapse text-left">
            <thead>
              <tr className="border-b border-app-border bg-[#fbfcfb] text-xs font-bold uppercase tracking-wide text-muted-text">
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
                <th className="w-[110px] px-4 py-3 text-right"> </th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => (
                <tr
                  className="border-b border-app-border last:border-b-0"
                  key={asset.id}
                >
                  <td className="px-4 py-4 align-middle">
                    <div className="font-mono text-xs text-[#46514d]">
                      {asset.id}
                    </div>
                    <div className="mt-1 text-sm font-bold text-[#06120f]">
                      {asset.name}
                    </div>
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <span className="inline-flex items-center rounded-full bg-[#f0f3f1] pr-2 text-xs font-bold">
                      <span
                        className={cn(
                          "mr-1.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[9px]",
                          categoryStyles[asset.category],
                        )}
                      >
                        {categoryShortLabels[asset.category]}
                      </span>
                      {asset.categoryLabel}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right align-middle text-sm font-semibold">
                    {asset.issued}{" "}
                    <span className="font-normal text-muted-text">
                      {asset.unit}
                    </span>
                  </td>
                  <td className="px-4 py-4 align-middle text-sm">
                    {asset.backing}
                  </td>
                  <td className="px-4 py-4 text-right align-middle text-sm font-semibold">
                    {asset.currentPrice ?? "—"}
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <span
                      className={cn(
                        "inline-flex items-center rounded px-2 py-1 text-xs font-bold",
                        statusStyles[asset.status],
                      )}
                    >
                      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                      {statusLabels[asset.status]}
                    </span>
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <div className="text-sm font-medium">
                      {asset.listedDate ?? "—"}
                    </div>
                    <div className="font-mono text-xs text-muted-text">
                      {asset.owner ?? "—"}
                    </div>
                  </td>
                  <td className="px-4 py-4 align-middle">
                    {asset.txHash ? (
                      <a
                        className="font-mono text-xs text-[#06120f] underline decoration-dotted underline-offset-2 hover:text-bidv-green"
                        href={`https://mumbai.polygonscan.com/tx/${asset.txHash}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {compactHash(asset.txHash)}
                      </a>
                    ) : (
                      <span className="text-sm text-muted-text">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <div className="flex justify-end gap-2">
                      <Button
                        aria-label={`Xem ${asset.name}`}
                        className="!h-8 !w-8 !border-0 !bg-transparent !p-0"
                        icon={<Eye aria-hidden="true" className="h-4 w-4" />}
                        type="text"
                      />
                      {asset.action === "continue" ? (
                        <Button className="!h-8 !rounded-md !border-0 !bg-bidv-gold !px-3 !font-semibold !text-white">
                          Tiếp tục
                        </Button>
                      ) : (
                        <Button
                          aria-label={
                            asset.action === "pause"
                              ? `Tạm dừng ${asset.name}`
                              : `Tiếp tục giao dịch ${asset.name}`
                          }
                          className="!h-8 !w-8 !border-0 !bg-transparent !p-0"
                          icon={
                            asset.action === "pause" ? (
                              <Pause aria-hidden="true" className="h-4 w-4" />
                            ) : (
                              <Play aria-hidden="true" className="h-4 w-4" />
                            )
                          }
                          type="text"
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 px-5 py-3 text-sm text-muted-text sm:flex-row sm:items-center sm:justify-between">
          <span>
            Hiển thị 1–{filteredAssets.length} / {filteredAssets.length} kết quả
          </span>
          <div className="flex gap-2">
            <Button
              className="!h-8 !rounded-md !border-app-border !text-xs"
              disabled
            >
              Trang trước
            </Button>
            <Button
              className="!h-8 !rounded-md !border-app-border !text-xs"
              disabled
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
