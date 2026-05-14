import { X } from "lucide-react";

import { StatusBadge } from "@/components/shared";
import { getStatusVariant } from "@/utils";
import type { KYCRecord } from "../types";

interface Props {
  record: KYCRecord;
  onClose: () => void;
}

export function DrawerHeader({ record, onClose }: Props) {
  return (
    <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between gap-3 sticky top-0 bg-white z-10">
      <div className="flex items-center justify-between w-full">
        <div>
          <div className="text-xs font-normal text-text-3 mb-0.5">{record.id}</div>

          <div className="flex items-center gap-3">
            <h3 className="text-[17px]! mb-0! sm:text-xl font-bold! text-gray-900">{record.name}</h3>
          </div>
        </div>

        <StatusBadge label={record.status} variant={getStatusVariant(record.status)} showDot />
      </div>

      <button onClick={onClose} className="p-1.5 text-gray-400 cursor-pointer hover:bg-gray-100 rounded-lg">
        <X size={20} />
      </button>
    </div>
  );
}
