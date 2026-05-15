import { httpClient } from "../http-client";
import type { IListingRequest } from "./type";

export const goldListingService = {
  create: async (data: IListingRequest) => {
    const response = await httpClient.post("/api/v1/assets", data);
    return response.data;
  },
};

export const carbonListingService = {
  create: async (data: IListingRequest) => {
    const response = await httpClient.post("/api/v1/assets", data);
    return response.data;
  },
};

export const realEstateListingService = {
  create: async (data: IListingRequest) => {
    const response = await httpClient.post("/api/v1/assets", data);
    return response.data;
  },
};
