import { FileBadge2 } from "lucide-react";
import { formatUnits } from "viem";
import { useAccount, useBalance } from "wagmi";

const balanceFormatter = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 4,
});

const formatBalance = (value: bigint, decimals: number, symbol: string) => {
  const numeric = Number(formatUnits(value, decimals));
  if (Number.isNaN(numeric)) return `— ${symbol}`;
  return `${balanceFormatter.format(numeric)} ${symbol}`;
};

export const WalletInfoCard = () => {
  const { address } = useAccount();
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
    query: { enabled: Boolean(address) },
  });

  if (!address) return null;

  return (
    <div className="rounded-[24px] bg-primary-50 px-4 py-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-text">
        <FileBadge2 className="h-5 w-5 text-bidv-green" />
        Ví Admin đã kết nối
      </div>
      <div className="mt-3 break-all font-mono text-sm text-text-2">
        {address}
      </div>
      <div className="mt-2 text-sm text-text-2">
        Balance:{" "}
        <span className="font-semibold text-text">
          {isBalanceLoading
            ? "Đang tải..."
            : balance
              ? formatBalance(balance.value, balance.decimals, balance.symbol)
              : "—"}
        </span>
      </div>
    </div>
  );
};
