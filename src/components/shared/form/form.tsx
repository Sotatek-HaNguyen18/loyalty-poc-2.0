import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Divider, type UploadFile } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { FormSection } from "./form-section";
import { FormInput } from "./form-input";
import { FormSelect } from "./form-select";
import { FormTextarea } from "./form-textarea";
import { FormDatePicker } from "./form-date-picker";
import { FormNumberInput } from "./form-number-input";
import { FormUpload } from "./form-upload";

const requiredNumber = (message: string) =>
  z.preprocess(
    (value) => (value == null || value === "" ? undefined : value),
    z
      .union([z.number(), z.undefined()])
      .refine((value): value is number => value !== undefined, message)
      .transform((value) => value as number),
  );

const createListedPropertySchema = z.object({
  description: z.string().nonempty("Mô tả là bắt buộc").min(20),
  displayName: z.string().nonempty("Tên hiển thị là bắt buộc").min(5).max(100),
  initialListingStatus: z.string(),
  inspectionCompany: z.string().nonempty("Đơn vị kiểm tra là bắt buộc"),
  inspectionDate: z.preprocess((value) => (value == null ? "" : value), z.string().min(1, "Ngày kiểm tra gần nhất là bắt buộc")),
  inspectionReport: z.array(z.custom<UploadFile>()).min(1, "Vui lòng upload báo cáo kiểm định").default([]),
  initialPrice: requiredNumber("Giá khởi tạo là bắt buộc").pipe(z.number().min(1)),
  listingCode: z.string(),
  maxTradeAmount: requiredNumber("Hạn mức tối đa / GD là bắt buộc").pipe(z.number().min(1)),
  minTradeAmount: requiredNumber("Hạn mức tối thiểu / GD là bắt buộc").pipe(z.number().min(1)),
  purity: z.string(),
  sellFee: requiredNumber("Phí bán là bắt buộc").pipe(z.number().min(0).max(10)),
  serialNumbers: z.string().nonempty("Số seri là bắt buộc"),
  storagePosition: z.string().nonempty("Vị trí trong kho là bắt buộc"),
  storageVault: z.string(),
  supplier: z.string(),
  tokenName: z.string().nonempty("Tên token là bắt buộc"),
  tokenizationRatio: z.string(),
  totalWeight: requiredNumber("Tổng khối lượng là bắt buộc").pipe(z.number().min(1)),
  tradingStartDate: z.preprocess((value) => (value == null ? "" : value), z.string().min(1, "Ngày bắt đầu giao dịch là bắt buộc")),
  buyFee: requiredNumber("Phí mua là bắt buộc").pipe(z.number().min(0).max(10)),
});

type CreateListedPropertyFormInput = z.input<typeof createListedPropertySchema>;
type CreateListedPropertyFormValues = z.output<typeof createListedPropertySchema>;

export const CreateListedPropertyDemoForm = () => {
  const form = useForm<CreateListedPropertyFormInput, undefined, CreateListedPropertyFormValues>({
    defaultValues: {
      buyFee: 0.15,
      description: "Lô vàng SJC 9999 99,99% lưu ký tại kho BIDV Hội sở Hà Nội.",
      displayName: "Vàng SJC 9999 — Lô 6/2026",
      initialListingStatus: "active",
      initialPrice: 950000,
      inspectionCompany: "SGS Vietnam",
      listingCode: "GOLD-20260520-003",
      maxTradeAmount: 5000,
      minTradeAmount: 10,
      purity: "9999-sjc",
      sellFee: 0.15,
      serialNumbers: `SJC-2024-12345678
SJC-2024-12345679
SJC-2024-12345680`,
      storagePosition: "T05-N03-V07",
      storageVault: "ha-noi-vault",
      supplier: "sjc",
      tokenName: "BGT-202605",
      tokenizationRatio: "0.01-chi",
      totalWeight: 2500,
      inspectionReport: []
    },
    resolver: zodResolver(createListedPropertySchema),
  });

  const handleSubmit = (values: CreateListedPropertyFormValues) => {
    console.log(values);
  };

  return (
    <Card className="rounded-2xl">
      <FormProvider {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(handleSubmit)}>
          {/* ================= GENERAL INFO ================= */}

          <FormSection description="Thông tin hiển thị trên catalog" title="Thông tin chung">
            <div className="grid grid-cols-2 gap-5">
              <FormInput disabled label="Mã đợt niêm yết" name="listingCode" required />

              <FormSelect
                label="Trạng thái niêm yết ban đầu"
                name="initialListingStatus"
                options={[
                  {
                    label: "Active",
                    value: "active",
                  },
                  {
                    label: "Inactive",
                    value: "inactive",
                  },
                ]}
                required
              />
            </div>

            <FormInput hint="5-100 ký tự" label="Tên hiển thị" name="displayName" required />

            <FormTextarea hint="Hiển thị trên catalog" label="Mô tả ngắn" name="description" required rows={4} />

            <FormDatePicker label="Ngày bắt đầu giao dịch" name="tradingStartDate" required />
          </FormSection>

          {/* ================= ASSET INFO ================= */}

          <FormSection description="Thông tin tài sản vật lý" title="Thông tin tài sản">
            <div className="grid grid-cols-3 gap-5">
              <FormNumberInput label="Tổng khối lượng" name="totalWeight" required suffix="gram" />

              <FormSelect
                label="Độ tinh khiết"
                name="purity"
                options={[
                  {
                    label: "9999 (SJC)",
                    value: "9999-sjc",
                  },
                ]}
                required
              />

              <FormSelect
                label="Nhà cung cấp"
                name="supplier"
                options={[
                  {
                    label: "SJC",
                    value: "sjc",
                  },
                ]}
                required
              />
            </div>

            <FormTextarea hint="Mỗi dòng 1 seri" label="Số seri từng thỏi" name="serialNumbers" required rows={5} />
          </FormSection>

          {/* ================= CUSTODY ================= */}

          <FormSection description="Thông tin lưu ký" title="Vị trí lưu ký">
            <div className="grid grid-cols-2 gap-5">
              <FormSelect
                label="Kho lưu trữ"
                name="storageVault"
                options={[
                  {
                    label: "Kho Hội sở Hà Nội",
                    value: "ha-noi-vault",
                  },
                ]}
                required
              />

              <FormInput hint="Định dạng Tủ-Ngăn-Vị trí" label="Vị trí trong kho" name="storagePosition" required />
            </div>
          </FormSection>

          {/* ================= INSPECTION ================= */}

          <FormSection description="Thông tin kiểm định chất lượng" title="Kiểm định chất lượng">
            <div className="grid grid-cols-2 gap-5">
              <FormInput label="Đơn vị kiểm tra" name="inspectionCompany" required />

              <FormDatePicker hint="≤ 6 tháng từ hôm nay" label="Ngày kiểm tra gần nhất" name="inspectionDate" required />
            </div>

            <FormUpload label="Báo cáo kiểm tra" name="inspectionReport" required />
          </FormSection>

          {/* ================= TOKENIZATION ================= */}

          <FormSection description="Cấu hình token và giao dịch" title="Tokenization">
            <div className="grid grid-cols-2 gap-5">
              <FormInput label="Tên token" name="tokenName" required />

              <FormSelect
                label="Tỷ lệ token hóa"
                name="tokenizationRatio"
                options={[
                  {
                    label: "1 BGT = 0,01 chỉ",
                    value: "0.01-chi",
                  },
                ]}
                required
              />
            </div>

            <div className="rounded-2xl bg-[#eef5f0] p-5">
              <div className="text-sm text-[#617267]">Tổng số token sẽ được mint</div>

              <div className="mt-2 text-3xl font-bold">66.666 BGT</div>

              <div className="mt-1 text-sm text-[#617267]">2500g × (1 chỉ / 3.75g) ÷ 0.01</div>
            </div>

            <FormNumberInput label="Giá khởi tạo" name="initialPrice" required suffix="VND" />

            <Divider />

            <div className="grid grid-cols-2 gap-5">
              <FormNumberInput label="Phí mua" max={10} name="buyFee" required suffix="%" />

              <FormNumberInput label="Phí bán" max={10} name="sellFee" required suffix="%" />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <FormNumberInput label="Hạn mức tối thiểu / GD" name="minTradeAmount" required suffix="BGT" />

              <FormNumberInput label="Hạn mức tối đa / GD" name="maxTradeAmount" required suffix="BGT" />
            </div>
          </FormSection>

          {/* ================= ACTIONS ================= */}

          <div className="flex justify-end gap-3">
            <Button size="large">Lưu nháp</Button>

            <Button htmlType="submit" size="large" type="primary">
              Tạo đợt niêm yết
            </Button>
          </div>
        </form>
      </FormProvider>
    </Card>
  );
};
