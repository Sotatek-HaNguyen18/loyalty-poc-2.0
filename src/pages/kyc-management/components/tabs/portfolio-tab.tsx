interface AssetCardProps {
  name: string;
  symbol: string;
  amount: string;
  value: string;
  theme: "yellow" | "blue" | "emerald";
}

function AssetCard({ name, symbol, amount, value, theme }: AssetCardProps) {
  const themeClasses = {
    yellow: {
      wrapper: "bg-gold-50 border-0",
      title: "text-[#c89a2a]",
      subtitle: "text-text-3",
      amount: "text-[#c89a2a]",
    },
    blue: {
      wrapper: "bg-[#e6efff] border-0",
      title: "text-[#1e5cb3]",
      subtitle: "text-text-3",
      amount: "text-[#1e5cb3]",
    },
    emerald: {
      wrapper: "bg-success-bg border-0",
      title: "text-success",
      subtitle: "text-text-3",
      amount: "text-success",
    },
  };

  const styles = themeClasses[theme];

  return (
    <div className={`py-3.5! px-4! rounded-xl border flex justify-between items-center ${styles.wrapper}`}>
      <div>
        <p className={`text-[13px] font-bold mb-0! ${styles.title}`}>
          {name} ({symbol})
        </p>

        <p className={`text-[11.5px] font-medium mt-0.5! mb-0! ${styles.subtitle}`}>
          {amount} {symbol} · {value}
        </p>
      </div>

      <span className={`text-[18px] font-bold font-mono tracking-tighter ${styles.amount}`}>{amount}</span>
    </div>
  );
}

interface Props {
  totalValue?: string;
}

export function PortfolioTab({ totalValue = "1.289 triệu VND" }: Props) {
  return (
    <div className="p-6 space-y-2.5">
      <div className="bg-primary-50 py-4 px-4.5 rounded-xl border-0 mb-5">
        <span className="text-[11.5px] font-normal text-text-3 block mb-1">Tổng giá trị danh mục</span>

        <h3 className="text-[22px] font-bold! text-bidv-green mb-0! leading-8.25!">{totalValue}</h3>
      </div>

      <AssetCard name="Vàng" symbol="BGT" amount="1.200" value="1.140M VND" theme="yellow" />

      <AssetCard name="Bất động sản" symbol="BRT" amount="50" value="125M VND" theme="blue" />

      <AssetCard name="Carbon Credit" symbol="BCT" amount="200" value="24M VND" theme="emerald" />
    </div>
  );
}
