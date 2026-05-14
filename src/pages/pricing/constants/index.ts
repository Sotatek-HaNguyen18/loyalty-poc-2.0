export const GOLD_HISTORY = [
  {
    by: "admin.bidv.eth",
    onChain: true,
    price: 950000,
    sjc: 948500,
    time: "13/05 09:00",
  },
  {
    by: "admin.bidv.eth",
    onChain: true,
    price: 948500,
    sjc: 947000,
    time: "12/05 09:00",
  },
  {
    by: "admin.bidv.eth",
    onChain: true,
    price: 947000,
    sjc: 946500,
    time: "11/05 09:00",
  },
  {
    by: "admin.bidv.eth",
    onChain: true,
    price: 946500,
    sjc: 945000,
    time: "10/05 09:15",
  },
  {
    by: "auto.oracle",
    onChain: false,
    price: 945000,
    sjc: 944000,
    time: "09/05 09:00",
  },
  {
    by: "auto.oracle",
    onChain: false,
    price: 944000,
    sjc: 943000,
    time: "08/05 09:00",
  },
  {
    by: "admin.bidv.eth",
    onChain: true,
    price: 943000,
    sjc: 942500,
    time: "07/05 09:00",
  },
];

export const RE_PROJECTS_PRICE = [
  {
    freq: "Tháng",
    id: "RE-2026-001",
    lastUpdate: "10/04/2026",
    name: "Vinhomes Ocean Park 3 — T15",
    next: "10/05/2026",
    price: 2500000,
    type: "Căn hộ",
  },
  {
    freq: "Quý",
    id: "RE-2026-002",
    lastUpdate: "02/03/2026",
    name: "Masteri Centre Point — Tầng 12",
    next: "02/06/2026",
    price: 2400000,
    type: "Văn phòng hạng A",
  },
  {
    freq: "Tháng",
    id: "RE-20260520-003",
    lastUpdate: "—",
    name: "The Opus One — Tòa T2",
    next: "—",
    price: 1050000,
    type: "Căn hộ cao cấp",
  },
];

export const CC_PROJECTS_PRICE = [
  {
    id: "CC-2026-001",
    lastUpdate: "12/05/2026",
    name: "Rừng ngập mặn Cà Mau",
    price: 120000,
    ref: 118000,
    registry: "Verra VCS",
    type: "Phục hồi rừng ngập mặn",
  },
  {
    id: "CC-2026-002",
    lastUpdate: "—",
    name: "Rừng Cúc Phương",
    price: 120000,
    ref: 122000,
    registry: "Verra VCS",
    type: "Trồng rừng / Tái trồng",
  },
];

export const CC_MARKET_REFS = [
  {
    color: "var(--success)",
    label: "VCS Nature-based (Việt Nam)",
    ref: 122000,
  },
  { color: "#1e5cb3", label: "VCS Technology (Việt Nam)", ref: 95000 },
  { color: "#c89a2a", label: "Gold Standard (Toàn cầu)", ref: 158000 },
  { color: "var(--text-2)", label: "UNFCCC CDM (Toàn cầu)", ref: 78000 },
];

export const VALUATION_FIRMS = [
  "Savills Việt Nam",
  "CBRE Việt Nam",
  "JLL Việt Nam",
  "Knight Frank Việt Nam",
  "Cushman & Wakefield",
  "Colliers Việt Nam",
];

export const ASSET_TABS = [
  { color: "#c89a2a", id: "gold", label: "Vàng (BGT)" },
  { color: "#1e5cb3", id: "re", label: "Bất động sản (BRT)" },
  { color: "#1c7c4c", id: "carbon", label: "Carbon Credit (BCT)" },
] as const;

export const PRICING_STATS = [
  {
    label: "Giá BGT hiện tại",
    sub: "+0,16% so với SJC tham chiếu",
    subClassName: "text-success",
    value: "950.000 đ",
  },
  {
    label: "Giá BRT trung bình",
    sub: "2 dự án đang giao dịch",
    subClassName: "text-text-3",
    value: "2,48M đ",
  },
  {
    label: "Giá BCT thị trường",
    sub: "≈ $4,92 / tCO₂e · VCS voluntary market",
    subClassName: "text-text-3",
    value: "120.000 đ",
  },
] as const;

export const CARBON_REFERENCE_SOURCES = [
  "XPANSIV CBL Market",
  "ACX Singapore",
  "Verra Registry",
  "Nội bộ BIDV",
] as const;
