import type { Asset, PaginatedResult, ResponseEnvelope } from "@/types/assets";
import { httpClient } from "../http-client";
import type { GetAssetsParams, IListingRequest } from "./types";

const ASSETS_ENDPOINT = "/assets";

export async function getAssets(
  params: GetAssetsParams = {},
): Promise<PaginatedResult<Asset>> {
  const { data } = await httpClient.get<
    ResponseEnvelope<PaginatedResult<Asset>>
  >(ASSETS_ENDPOINT, { params });

  return data.data;
}

export async function createAsset(payload: IListingRequest) {
  const { data } = await httpClient.post(ASSETS_ENDPOINT, payload);
  return data;
}
