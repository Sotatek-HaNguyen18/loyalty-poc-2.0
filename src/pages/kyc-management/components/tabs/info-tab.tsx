import { Check, CheckCircle2 } from "lucide-react";
import { KYC_DOCS } from "../../constants/mock-kyc-data";
import type { KYCRecord } from "../../types";

interface Props {
  record: KYCRecord;
}

export function KYCInfoTab({ record }: Props) {
  const fields = [
    { label: "Họ và tên", value: record.name },
    { label: "Số điện thoại", value: record.phone },
    { label: "CCCD", value: record.cccd },
    { label: "Ngày đăng ký", value: record.registrationDate },
    { label: "Cấp KYC", value: record.level },
    { label: "Khẩu vị rủi ro", value: record.riskAppetite },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {fields.map((item) => (
          <div key={item.label} className="bg-app-bg px-3.5 py-2.5 rounded-[8px] border border-gray-100">
            <span className="text-[11px] font-normal text-text-3 block mb-0.5">{item.label}</span>

            <span className="text-[13px] font-semibold text-text">{item.value}</span>
          </div>
        ))}
      </div>

      <div>
        <h4 className="text-[11px] font-semibold! text-text-3 uppercase tracking-widest mb-3!">VÍ BLOCKCHAIN</h4>{" "}
        <div className="bg-primary-50 py-3 px-3.5 rounded-[8px]">
          <span className="text-[11px] font-normal text-text-3 block mb-1">Địa chỉ ví custodial</span>{" "}
          <span className="text-[12.5px] font-semibold text-bidv-green font-mono break-all">{record.walletAddress}</span>{" "}
        </div>
      </div>

      <div>
        <h4 className="text-[11px] font-semibold! text-text-3 uppercase tracking-widest mb-3!">TÀI LIỆU KYC</h4>

        <div className="space-y-2">
          {KYC_DOCS.map((doc) => (
            <div key={doc.label} className="flex items-center justify-between px-3 py-2 bg-app-bg rounded-[8px] border border-gray-100">
              <div className="flex items-center gap-3">
                <Check size={13} className="text-success" />
                <span className="text-[13px] font-normal text-text">{doc.label}</span>
              </div>

              <span className="text-[10px] font-normal text-text-3">{doc.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
