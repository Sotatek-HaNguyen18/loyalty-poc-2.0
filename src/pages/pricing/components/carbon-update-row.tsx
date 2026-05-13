import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { DollarSign, Link } from "lucide-react";
import { Fragment, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { FormDatePicker } from "@/components/shared/form/form-date-picker";
import { FormNumberInput } from "@/components/shared/form/form-number-input";
import { FormSelect } from "@/components/shared/form/form-select";
import { CARBON_REFERENCE_SOURCES } from "../constants";
import { type CcProjectRow } from "../types";
import { formatVnd, getDeviation } from "../utils";

const CARBON_DEVIATION_THRESHOLD = 5;
const DEFAULT_REFERENCE_DATE = new Date("2026-05-13").toISOString();

const carbonSchema = z.object({
  price: z
    .number({ error: "Vui lòng nhập giá mới" })
    .positive("Giá phải lớn hơn 0"),
  referenceDate: z.string().min(1, "Vui lòng chọn ngày tham chiếu"),
  referenceSource: z.string().min(1, "Vui lòng chọn nguồn tham chiếu"),
});

type CarbonFormValues = z.infer<typeof carbonSchema>;

const SOURCE_OPTIONS = CARBON_REFERENCE_SOURCES.map((v) => ({
  label: v,
  value: v,
}));

type CarbonUpdateRowProps = {
  project: CcProjectRow;
};

export const CarbonUpdateRow = ({ project }: CarbonUpdateRowProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<CarbonFormValues>({
    defaultValues: {
      price: project.price,
      referenceDate: DEFAULT_REFERENCE_DATE,
      referenceSource: CARBON_REFERENCE_SOURCES[0],
    },
    resolver: zodResolver(carbonSchema),
  });

  const handlePush = (values: CarbonFormValues) => {
    console.log("push BCT oracle", { projectId: project.id, ...values });
    setIsOpen(false);
  };

  const deviation = getDeviation(project.price, project.ref);

  return (
    <Fragment>
      <tr className="border-b border-border-soft transition-colors hover:bg-bg-alt">
        <td className="px-4 py-3">
          <div className="font-mono text-xs text-text-2">{project.id}</div>
          <div className="mt-0.5 text-[13px] font-semibold text-text">
            {project.name}
          </div>
          <div className="text-[11px] text-text-3">{project.type}</div>
        </td>
        <td className="px-4 py-3">
          <span className="inline-flex rounded-xs bg-primary-50 px-2 py-1 text-[11px] font-semibold text-bidv-green">
            {project.registry}
          </span>
        </td>
        <td className="px-4 py-3 text-right text-[12.5px]">
          {formatVnd(project.price)} đ
        </td>
        <td className="px-4 py-3 text-right text-[12.5px] text-success">
          {formatVnd(project.ref)} đ
        </td>
        <td className="px-4 py-3 text-right text-[12px] font-semibold">
          <span
            className={
              Math.abs(deviation) > CARBON_DEVIATION_THRESHOLD
                ? "text-warn"
                : "text-success"
            }
          >
            {deviation >= 0 ? "+" : ""}
            {deviation.toFixed(1)}%
          </span>
        </td>
        <td className="px-4 py-3 text-[12px]">{project.lastUpdate}</td>
        <td className="px-4 py-3 text-right">
          <Button
            className="inline-flex! items-center! gap-1.5! px-2.5! py-1! text-xs! font-medium! text-text-2! hover:bg-app-bg! hover:text-text!"
            htmlType="button"
            onClick={() => setIsOpen((previous) => !previous)}
            type="text"
          >
            <DollarSign className="size-3.5 shrink-0" aria-hidden />
            Cập nhật
          </Button>
        </td>
      </tr>

      {isOpen ? (
        <tr className="border-b border-border-soft bg-bg-alt last:border-b-0">
          <td className="px-4 pb-4" colSpan={7}>
            <div className="mt-2 rounded-md border border-app-border bg-card p-4">
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(handlePush)}>
                  <div className="grid gap-3 md:grid-cols-3">
                    <FormNumberInput
                      hint={`Tham chiếu thị trường: ${formatVnd(project.ref)} đ`}
                      label="Giá mới (VND/BCT)"
                      name="price"
                      required
                      suffix="VND"
                    />
                    <FormSelect
                      label="Nguồn tham chiếu"
                      name="referenceSource"
                      options={SOURCE_OPTIONS}
                      required
                    />
                    <FormDatePicker
                      label="Ngày tham chiếu"
                      name="referenceDate"
                      required
                    />
                  </div>

                  <div className="mt-3 flex justify-end gap-2">
                    <Button
                      className="px-2.5! py-1! text-xs! font-medium! text-text-2! hover:bg-app-bg! hover:text-text!"
                      htmlType="button"
                      onClick={() => setIsOpen(false)}
                      type="text"
                    >
                      Hủy
                    </Button>
                    <Button
                      className="inline-flex! items-center! gap-1.5! text-xs! font-medium!"
                      htmlType="submit"
                      type="primary"
                    >
                      <Link className="size-3.5 shrink-0" aria-hidden />
                      Đẩy Oracle on-chain
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </td>
        </tr>
      ) : null}
    </Fragment>
  );
};
