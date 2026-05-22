import { Button } from "antd";
import { Link } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { FormDatePicker } from "@/components/shared/form/form-date-picker";
import { FormNumberInput } from "@/components/shared/form/form-number-input";
import { formatCompactVnd } from "@/utils";

const SJC_REF = 948500;
const GOLD_DEVIATION_THRESHOLD = 2;

type GoldUpdateFormProps = {
  deviation: number;
};

export const GoldUpdateForm = ({ deviation }: GoldUpdateFormProps) => {
  const { handleSubmit, reset } = useFormContext();
  const isDeviationOverThreshold =
    Math.abs(deviation) > GOLD_DEVIATION_THRESHOLD;

  const handlePush = (values: unknown) => {
    console.log("push oracle", values);
  };

  return (
    <div className="mb-5 rounded-[10px] bg-app-bg p-3 sm:p-5">
      <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-3">
        Cập nhật giá mới
      </div>

      <form onSubmit={handleSubmit(handlePush)}>
        <div className="mb-4 grid gap-3 md:grid-cols-3">
          <FormNumberInput
            hint={`SJC ref: ${formatCompactVnd(SJC_REF)}`}
            label="Giá mua (VND/BGT)"
            name="goldBuy"
            required
            suffix="VND"
          />
          <FormNumberInput
            hint="Spread = giá mua − giá bán"
            label="Giá bán (VND/BGT)"
            name="goldSell"
            required
            suffix="VND"
          />
          <FormDatePicker
            label="Hiệu lực từ"
            name="effectiveTime"
            required
            showTime
          />
        </div>

        {isDeviationOverThreshold ? (
          <div className="mb-3.5 rounded-md bg-warn-bg px-3.5 py-2.5 text-[12.5px] text-warn">
            <strong>Cảnh báo:</strong> Độ lệch {Math.abs(deviation).toFixed(2)}%
            vượt ngưỡng 2%. Cần phê duyệt từ Trưởng phòng Trading trước khi cập
            nhật on-chain.
          </div>
        ) : null}

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            className="w-full px-3.5! py-1.5! text-[13px]! font-medium! text-text-2! hover:bg-app-bg! hover:text-text! sm:w-auto"
            htmlType="button"
            onClick={() => reset()}
            type="text"
          >
            Hủy thay đổi
          </Button>
          <Button
            className="w-full text-[13px]! sm:w-auto"
            htmlType="submit"
            icon={<Link size={14} />}
            type="primary"
          >
            <span className="font-medium">Đẩy lên Oracle on-chain</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
