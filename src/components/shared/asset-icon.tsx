import type { AssetType } from "@/pages/batch-reconciliation/types";
import { KindChip } from "./kind-chip";

export const AssetIcon = ({ type }: { type: AssetType }) => {
  switch (type) {
    case "Gold":
      return <KindChip label="Vàng" type="gold" />;
    case "RealEstate":
      return <KindChip label="Bất động sản" type="real_estate" />;
    case "Carbon":
      return <KindChip label="Carbon Credit" type="carbon" />;
  }
};
