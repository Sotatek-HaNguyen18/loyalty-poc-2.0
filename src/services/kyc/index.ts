import { httpClient } from "../http-client";
import type { GetKYCParams, KYCDetailResponse, KYCListResponse, KYCListResult, UpdateKYCLevelPayload } from "./types";

const KYC_ENDPOINT = "/kyc";

export async function getKYCList(params: GetKYCParams = {}): Promise<KYCListResult> {
  const response = await httpClient.get<KYCListResponse>(KYC_ENDPOINT, {
    params: {
      search: params.search,
      status: params.status,
      riskAppetite: params.riskAppetite,
      kycLevel: params.kycLevel,
      page: params.page ?? 1,
      limit: params.limit ?? 10,
    },
  });

  return response.data.data;
}

export async function getKYCDetail(id: string) {
  const response = await httpClient.get<KYCDetailResponse>(`${KYC_ENDPOINT}/${id}`);

  return response.data.data;
}

export async function freezeKYC(id: string) {
  const response = await httpClient.post(`${KYC_ENDPOINT}/${id}/freeze`);

  return response.data;
}

export async function unfreezeKYC(id: string) {
  const response = await httpClient.post(`${KYC_ENDPOINT}/${id}/unfreeze`);

  return response.data;
}

export async function freezeWallet(idOrAddress: string) {
  return freezeKYC(idOrAddress);
}

export async function unfreezeWallet(idOrAddress: string) {
  return unfreezeKYC(idOrAddress);
}

export async function updateKYCLevel(id: string, payload: UpdateKYCLevelPayload) {
  const response = await httpClient.patch(`${KYC_ENDPOINT}/${id}/level`, payload);
  return response.data;
}

export async function approveKYC(id: string) {
  const response = await httpClient.post(`${KYC_ENDPOINT}/${id}/approve`);
  return response.data;
}
