import dayjs from "dayjs";

import type { ApiKYCRecord } from "@/services";
import type { KYCRecord } from "../types";

const portfolioFormatter = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 2,
  notation: "compact",
});

const formatPortfolio = (portfolio: ApiKYCRecord["portfolio"]) => {
  const total = Object.values(portfolio ?? {}).reduce((sum, value) => sum + Number(value || 0), 0);
  if (!total) return "-";

  return portfolioFormatter.format(total);
};

const compactAddress = (address?: string) => {
  if (!address) return "Chưa cấp";
  if (address.length <= 12) return address;

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const onlyDigits = (value?: string) => value?.replace(/\D/g, "") ?? "";

export const maskPhoneNumber = (phoneNumber?: string) => {
  const digits = onlyDigits(phoneNumber);
  if (!digits) return "-";
  if (digits.length <= 7) return phoneNumber ?? "-";

  return `${digits.slice(0, 4)} ***${digits.slice(-3)}`;
};

export const maskCitizenId = (citizenId?: string) => {
  const digits = onlyDigits(citizenId);
  if (!digits) return "-";
  if (digits.length <= 7) return citizenId ?? "-";

  return `${digits.slice(0, 3)} *** ${digits.slice(-4)}`;
};

const mapKYCLevel = (level: string): KYCRecord["level"] => {
  const normalizedLevel = level.toUpperCase();
  if (normalizedLevel === "VIP") return "VIP";
  if (normalizedLevel === "LEVEL_2") return "Level 2";

  return "Level 1";
};

const mapKYCStatus = (status: string): KYCRecord["status"] => {
  const normalizedStatus = status.toUpperCase();
  if (normalizedStatus === "FROZEN") return "Frozen";
  if (normalizedStatus === "PENDING" || normalizedStatus === "PROCESSING") return "Đang xử lý";

  return "Đang giao dịch";
};

const mapRiskAppetite = (riskAppetite: string): KYCRecord["riskAppetite"] => {
  const normalizedRisk = riskAppetite.toUpperCase();
  if (normalizedRisk === "CONSERVATIVE" || normalizedRisk === "LOW") return "Thận trọng";
  if (normalizedRisk === "AGGRESSIVE" || normalizedRisk === "HIGH") return "Năng động";

  return "Trung bình";
};

export const mapKYCRecord = (record: ApiKYCRecord): KYCRecord => ({
  detailId: record.id || record.walletAddress || record.custodialWalletAddress || record.investor,
  id: record.investor || record.id,
  name: record.fullName || record.investor,
  phone: maskPhoneNumber(record.phoneNumber),
  cccd: maskCitizenId(record.citizenId),
  level: mapKYCLevel(record.kycLevel),
  riskAppetite: mapRiskAppetite(record.riskAppetite),
  walletAddress: compactAddress(record.walletAddress),
  limit: formatPortfolio(record.portfolio),
  status: mapKYCStatus(record.status),
  registrationDate: dayjs(record.createdAt).isValid() ? dayjs(record.createdAt).format("DD/MM/YYYY") : "-",
});
