import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "antd";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useCreateCarbonStore } from "@/stores/useCreateCarbonStore";
import {
  DateField,
  SectionHeading,
  SelectField,
  StepFooter,
  StepHeader,
  TextField,
} from "../components/shared";
import type { CreateStepPageProps, CarbonProjectData } from "./types";

export const CarbonProjectStep = ({
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  onSaveDraft,
}: CreateStepPageProps) => {
  const { carbonProject, setCarbonProject } = useCreateCarbonStore();
  const { control, handleSubmit } = useForm<CarbonProjectData>({
    defaultValues: carbonProject,
  });

  const onSubmit = (data: CarbonProjectData) => {
    setCarbonProject(data);
    onNext();
  };

  return (
    <form
      className="rounded-[28px] border border-app-border bg-white p-8 shadow-[0_18px_55px_rgba(8,31,20,0.05)] xl:p-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StepHeader
        description="Thông tin về dự án carbon: methodology áp dụng, năm phát thải (vintage), khu vực, đơn vị xác minh độc lập. Số tCO2e nhập vào phải khớp với verification report."
        stepLabel="Bước 2 / 4"
        title="Dự án Carbon"
      />

      <div className="mt-8 space-y-8">
        <div className="grid gap-6 xl:grid-cols-2">
          <SelectField
            control={control}
            label="Loại dự án"
            isRequired={true}
            name="projectType"
            options={["Trồng rừng / Tái trồng (AR)", "Bảo vệ rừng (REDD+)"]}
          />
          <SelectField
            control={control}
            helper="Năm CO2e được giảm/hấp thụ thực tế"
            label="Năm phát thải (Vintage)"
            isRequired={true}
            name="vintage"
            options={["2026", "2025", "2024"]}
          />
          <div className="xl:col-span-2">
            <SelectField
              control={control}
              helper="Phải nằm trong danh sách approved của registry đã chọn"
              label="Methodology"
              isRequired={true}
              name="methodology"
              options={["AR-ACM0003 — Afforestation & Reforestation"]}
            />
          </div>
        </div>

        <div className="border-t border-app-border pt-8">
          <SectionHeading>REGISTRY & PROJECT ID</SectionHeading>
          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <SelectField
              control={control}
              label="Registry quốc tế"
              isRequired={true}
              name="registry"
              options={["Verra (VCS)", "Gold Standard"]}
            />
            <TextField
              control={control}
              helper="Phải verify được công khai trên registry.verra.org"
              label="Project ID trên registry"
              isRequired={true}
              name="projectId"
            />
          </div>
        </div>

        <div className="border-t border-app-border pt-8">
          <SectionHeading>VỊ TRÍ DỰ ÁN</SectionHeading>
          <div className="mt-6 grid gap-6 xl:grid-cols-3">
            <div className="xl:col-span-3">
              <TextField
                control={control}
                label="Mô tả vị trí"
                isRequired={true}
                name="locationDescription"
                placeholder="VD: Vườn Quốc gia Cúc Phương — Ninh Bình"
              />
            </div>
            <TextField
              control={control}
              label="Quốc gia"
              isRequired={true}
              name="country"
            />
            <TextField
              control={control}
              helper="Lat / Long — WGS84"
              label="Tọa độ trung tâm"
              isRequired={true}
              name="coordinates"
            />
            <TextField
              control={control}
              label="Diện tích"
              isRequired={true}
              name="area"
              rightAddon="ha"
            />
          </div>
        </div>
        <div className="border-t border-app-border pt-8">
          <SectionHeading>XÁC MINH ĐỘC LẬP (VVB)</SectionHeading>
          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <TextField
              control={control}
              label="Đơn vị phát triển dự án"
              isRequired={true}
              name="developer"
            />
            <SelectField
              control={control}
              label="Đơn vị xác minh (VVB)"
              isRequired={true}
              name="vvb"
              options={["SCS Global Services"]}
            />
            <DateField
              control={control}
              label="Ngày xác minh gần nhất"
              isRequired={true}
              name="lastVerificationDate"
            />
            <DateField
              control={control}
              helper="Monitoring · Reporting · Verification"
              label="Lịch MRV kế tiếp"
              isRequired={true}
              name="nextMrvDate"
            />
            <TextField
              control={control}
              helper="~ 166.7 tCO2e / ha"
              label="Tổng tCO2e phát hành"
              isRequired={true}
              name="totalIssuedCredits"
              rightAddon="tCO2e"
            />
          </div>
        </div>

        <div className="border-t border-app-border pt-8">
          <SectionHeading>ĐÓNG GÓP LỢI ÍCH (CO-BENEFITS)</SectionHeading>
          <div className="mt-6 space-y-6">
            <div>
              <div className="mb-2 text-sm font-semibold text-[#16211d]">
                SDG được đóng góp
              </div>
              <Controller
                control={control}
                name="sdgs"
                render={({ field: { value = [], onChange } }) => {
                  const sdgOptions = [
                    { id: "sdg1", label: "SDG 1 — Xóa nghèo" },
                    { id: "sdg6", label: "SDG 6 — Nước sạch" },
                    { id: "sdg8", label: "SDG 8 — Việc làm bền vững" },
                    { id: "sdg13", label: "SDG 13 — Hành động khí hậu" },
                    { id: "sdg14", label: "SDG 14 — Sinh vật biển" },
                    { id: "sdg15", label: "SDG 15 — Hệ sinh thái trên cạn" },
                  ];

                  return (
                    <div className="flex flex-wrap gap-3">
                      {sdgOptions.map((sdg) => {
                        const isSelected = value.includes(sdg.id);
                        return (
                          <button
                            key={sdg.id}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                onChange(value.filter((id) => id !== sdg.id));
                              } else {
                                onChange([...value, sdg.id]);
                              }
                            }}
                            className={cn(
                              "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                              isSelected
                                ? "border-bidv-green text-bidv-green bg-[#edf5f1]"
                                : "border-app-border text-[#53635c] hover:bg-[#f7f9f8]"
                            )}
                          >
                            {isSelected && <Check className="h-4 w-4" />}
                            {sdg.label}
                          </button>
                        );
                      })}
                    </div>
                  );
                }}
              />
              <p className="mt-2 text-base text-[#8a9993]">
                Chọn các SDG có bằng chứng đo lường được
              </p>
            </div>

            <div>
              <div className="mb-2 text-sm font-semibold text-[#16211d]">
                Đã pass additionality test
              </div>
              <Controller
                control={control}
                name="passedAdditionalityTest"
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                    className="font-semibold text-bidv-green"
                  >
                    Có — đã qua kiểm tra additionality theo CDM Tool 01
                  </Checkbox>
                )}
              />
              <p className="mt-2 text-base text-[#8a9993]">
                Chứng minh dự án sẽ không xảy ra nếu không có tài chính carbon
              </p>
            </div>
          </div>
        </div>
      </div>

      <StepFooter
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        onBack={onBack}
        onSaveDraft={onSaveDraft}
      />
    </form>
  );
};
