import type { AssetCategory, ResponseEnvelope } from "@/types/assets";
import { httpClient } from "../http-client";

const CATEGORIES_ENDPOINT = "/asset-categories";

export async function getAssetCategories(): Promise<AssetCategory[]> {
  const { data } =
    await httpClient.get<ResponseEnvelope<AssetCategory[]>>(
      CATEGORIES_ENDPOINT,
    );

  return data.data;
}
