import type { ResponseEnvelope } from "@/types/assets";
import { httpClient } from "../http-client";
import type { OverviewSummary } from "./types";

const OVERVIEW_ENDPOINT = "/overview/summary";

export async function getOverviewSummary(): Promise<OverviewSummary> {
  const { data } =
    await httpClient.get<ResponseEnvelope<OverviewSummary>>(OVERVIEW_ENDPOINT);

  return data.data;
}
