export const compactHash = (hash?: string) => {
  if (!hash) {
    return "—";
  }

  return `${hash.slice(0, 10)}...${hash.slice(-4)}`;
};

const BILLION = 1_000_000_000;

/** Thousands: `.` · Decimal: `,` */
export function formatNumber(value: number, maxFractionDigits = 0): string {
  return new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxFractionDigits,
  }).format(value);
}

function formatCompactVndParts(amount: number): {
  value: string;
  unit: string;
} {
  if (amount >= BILLION) {
    return {
      value: formatNumber(amount / BILLION, 1),
      unit: "tỷ",
    };
  }
  return {
    value: formatNumber(amount),
    unit: "đ",
  };
}

export function formatCompactVnd(amount: number): string {
  const { value, unit } = formatCompactVndParts(amount);
  return `${value} ${unit}`;
}
