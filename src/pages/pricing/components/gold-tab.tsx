import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { getDeviation } from "../utils";
import { GoldComparisonPanels } from "./gold-comparison-panels";
import { GoldHistoryTable } from "./gold-history-table";
import { GoldUpdateForm } from "./gold-update-form";

const SJC_REF = 948500;
const DEFAULT_GOLD_BUY = 950000;
const DEFAULT_GOLD_SELL = 945000;
const DEFAULT_EFFECTIVE_TIME = new Date("2026-05-14T09:00").toISOString();

const goldSchema = z.object({
  effectiveTime: z.string().min(1, "Vui lòng chọn thời gian hiệu lực"),
  goldBuy: z
    .number({ error: "Vui lòng nhập giá mua" })
    .positive("Giá mua phải lớn hơn 0"),
  goldSell: z
    .number({ error: "Vui lòng nhập giá bán" })
    .positive("Giá bán phải lớn hơn 0"),
});

type GoldFormValues = z.infer<typeof goldSchema>;

export const GoldTab = () => {
  const form = useForm<GoldFormValues>({
    defaultValues: {
      effectiveTime: DEFAULT_EFFECTIVE_TIME,
      goldBuy: DEFAULT_GOLD_BUY,
      goldSell: DEFAULT_GOLD_SELL,
    },
    resolver: zodResolver(goldSchema),
  });

  const goldBuy =
    useWatch({ control: form.control, name: "goldBuy" }) ?? DEFAULT_GOLD_BUY;
  const deviation = useMemo(() => getDeviation(goldBuy, SJC_REF), [goldBuy]);

  return (
    <FormProvider {...form}>
      <GoldComparisonPanels deviation={deviation} goldBuy={goldBuy} />
      <GoldUpdateForm deviation={deviation} />
      <GoldHistoryTable />
    </FormProvider>
  );
};
