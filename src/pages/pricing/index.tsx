import { useState } from "react";
import { type AssetTabId } from "./types";
import { CarbonTab } from "./components/carbon-tab";
import { GoldTab } from "./components/gold-tab";
import { PricingHeader } from "./components/pricing-header";
import { PricingStats } from "./components/pricing-stats";
import { PricingTabs } from "./components/pricing-tabs";
import { ReTab } from "./components/re-tab";

export const PricingPage = () => {
  const [activeAsset, setActiveAsset] = useState<AssetTabId>("gold");

  return (
    <section>
      <PricingHeader />
      <PricingStats />

      <div className="overflow-hidden rounded-lg border border-app-border bg-card">
        <PricingTabs activeAsset={activeAsset} onChange={setActiveAsset} />

        <div className="p-3 sm:p-5">
          {activeAsset === "gold" ? <GoldTab /> : null}
          {activeAsset === "re" ? <ReTab /> : null}
          {activeAsset === "carbon" ? <CarbonTab /> : null}
        </div>
      </div>
    </section>
  );
};
