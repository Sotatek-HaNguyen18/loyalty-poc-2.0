interface KindChipProps {
  label: string;
  type?: "gold" | "real_estate" | "carbon";
}

export function KindChip({ label, type = "gold" }: KindChipProps) {
  const styles = {
    gold: {
      dot: "bg-gradient-to-br from-[#c89a2a] to-[#735c00]",
      text: "text-[#1f2937]",
      symbol: "V",
    },

    real_estate: {
      dot: "bg-gradient-to-br from-[#4a7ec2] to-[#1e5cb3]",
      text: "text-[#1f2937]",
      symbol: "BĐS",
    },

    carbon: {
      dot: "bg-gradient-to-br from-[#4d9b6e] to-[#1c7c4c]",
      text: "text-[#1f2937]",
      symbol: "CO₂",
    },
  };

  const current = styles[type];

  return (
    <div
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        bg-[#f3f4f6]
        px-1.5
        py-1
      "
    >
      <div
        className={`
          flex items-center justify-center
          min-w-4.5 min-h-4.5
          rounded-full
          px-1
          text-[8px]
          font-extrabold
          leading-none
          text-white
          ${current.dot}
        `}
      >
        {current.symbol}
      </div>

      <span
        className={`
          pr-1
          text-[12px]
          font-semibold
          ${current.text}
        `}
      >
        {label}
      </span>
    </div>
  );
}
