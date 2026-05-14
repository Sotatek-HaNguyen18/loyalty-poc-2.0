import { ASSET_TABS } from "../constants";
import { type AssetTabId } from "../types";

type PricingTabsProps = {
  activeAsset: AssetTabId;
  onChange: (assetId: AssetTabId) => void;
};

export const PricingTabs = ({ activeAsset, onChange }: PricingTabsProps) => {
  return (
    <div className="border-b border-border-soft">
      <div
        className="flex flex-nowrap gap-1 overflow-x-auto overscroll-x-contain touch-pan-x px-3 pb-px scrollbar-none sm:px-5"
        role="tablist"
      >
        {ASSET_TABS.map((tab) => {
          const isActive = activeAsset === tab.id;

          return (
            <div
              className="-mb-px shrink-0 cursor-pointer whitespace-nowrap border-b-2 border-transparent px-3 py-2.5 text-[13px] font-medium text-text-3 transition-colors hover:text-text sm:px-3.5"
              key={tab.id}
              onClick={() => onChange(tab.id)}
              role="tab"
              aria-selected={isActive}
              style={
                isActive
                  ? {
                      borderBottomColor: tab.color,
                      color: tab.color,
                      fontWeight: 600,
                    }
                  : undefined
              }
            >
              {tab.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};
