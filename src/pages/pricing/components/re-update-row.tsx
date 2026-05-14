import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { Check, DollarSign } from "lucide-react";
import { Fragment, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { FormDatePicker } from "@/components/shared/form/form-date-picker";
import { FormNumberInput } from "@/components/shared/form/form-number-input";
import { FormSelect } from "@/components/shared/form/form-select";
import { VALUATION_FIRMS } from "../constants";
import { type ReProjectRow } from "../types";
import { formatVnd } from "../utils";

const DEFAULT_REFERENCE_DATE = new Date("2026-05-13").toISOString();

const reSchema = z.object({
  price: z
    .number({ error: "Vui lòng nhập giá mới" })
    .positive("Giá phải lớn hơn 0"),
  referenceDate: z.string().min(1, "Vui lòng chọn ngày báo cáo"),
  valuationFirm: z.string().min(1, "Vui lòng chọn đơn vị định giá"),
});

type ReFormValues = z.infer<typeof reSchema>;

const VALUATION_OPTIONS = VALUATION_FIRMS.map((v) => ({ label: v, value: v }));

type ReUpdateRowProps = {
  project: ReProjectRow;
};

export const ReUpdateRow = ({ project }: ReUpdateRowProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<ReFormValues>({
    defaultValues: {
      price: project.price,
      referenceDate: DEFAULT_REFERENCE_DATE,
      valuationFirm: VALUATION_FIRMS[0],
    },
    resolver: zodResolver(reSchema),
  });

  const handleConfirm = (values: ReFormValues) => {
    console.log("update BRT", { projectId: project.id, ...values });
    setIsOpen(false);
  };

  return (
    <Fragment>
      <tr className="border-b border-border-soft transition-colors hover:bg-bg-alt">
        <td className="px-4 py-3">
          <div className="font-mono text-xs text-text-2">{project.id}</div>
          <div className="mt-0.5 text-[13px] font-semibold text-text">
            {project.name}
          </div>
        </td>
        <td className="px-4 py-3 text-[12px]">{project.type}</td>
        <td className="px-4 py-3 text-right text-[13px]">
          {formatVnd(project.price)} đ <span className="text-text-3">/BRT</span>
        </td>
        <td className="px-4 py-3 text-[12px]">{project.lastUpdate}</td>
        <td className="px-4 py-3 text-[12px]">{project.freq}</td>
        <td className="px-4 py-3 text-[12px] text-warn">{project.next}</td>
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
                <form onSubmit={form.handleSubmit(handleConfirm)}>
                  <div className="grid gap-3 md:grid-cols-3">
                    <FormNumberInput
                      hint={`Hiện tại: ${formatVnd(project.price)} đ`}
                      label="Giá mới (VND/BRT)"
                      name="price"
                      required
                      suffix="VND"
                    />
                    <FormSelect
                      label="Đơn vị định giá"
                      name="valuationFirm"
                      options={VALUATION_OPTIONS}
                      required
                    />
                    <FormDatePicker
                      label="Ngày báo cáo định giá"
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
                      <Check className="size-3.5 shrink-0" aria-hidden />
                      Xác nhận cập nhật
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
