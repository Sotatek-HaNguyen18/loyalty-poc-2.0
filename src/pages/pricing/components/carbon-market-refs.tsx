import { CC_MARKET_REFS } from "../constants";
import { formatCompactVnd } from "@/utils";

export const CarbonMarketRefs = () => {
  return (
    <div className="mb-5 grid gap-2.5 md:grid-cols-2">
      {CC_MARKET_REFS.map((reference) => (
        <article
          className="flex items-center justify-between rounded bg-app-bg px-3.5 py-3"
          key={reference.label}
        >
          <div>
            <div className="mb-0.5 text-[10.5px] text-text-3">Tham chiếu</div>
            <div className="text-[12.5px] font-semibold text-text">
              {reference.label}
            </div>
          </div>
          <div
            className="font-display text-[15px] font-bold!"
            style={{ color: reference.color }}
          >
            {formatCompactVnd(reference.ref)}
          </div>
        </article>
      ))}
    </div>
  );
};
