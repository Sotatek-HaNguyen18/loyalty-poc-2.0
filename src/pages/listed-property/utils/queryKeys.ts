import type { QueryClient } from "@tanstack/react-query";

export const listedAssetsQueryKeys = {
  all: ["listed-assets"] as const,
  stats: ["listed-assets-stats"] as const,
};

export async function invalidateListedAssetsQueries(queryClient: QueryClient) {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: listedAssetsQueryKeys.all }),
    queryClient.invalidateQueries({ queryKey: listedAssetsQueryKeys.stats }),
  ]);
}
