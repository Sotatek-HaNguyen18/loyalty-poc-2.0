import { StatCard } from "@/components/shared/stat-card";

import { PRICING_STATS } from "../constants";

export const PricingStats = () => {
  return (
    <div className="mb-4 grid grid-cols-1 gap-3 sm:mb-5 sm:grid-cols-2 lg:grid-cols-3">
      {PRICING_STATS.map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          subClassName={stat.subClassName}
          subValue={stat.sub}
          value={stat.value}
        />
      ))}
    </div>
  );
};
