import {
  BatchReconciliationPage,
  ListedPropertyPage,
  ListingCarbonPage,
  ListingGoldPage,
  ListingRealEstatePage,
  OverviewPage,
  PricingPage,
} from "@/pages";
import { KYCPage } from "@/pages/kyc-management";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { paths } from "./paths";
import { ProtectedRoutes } from "./protected-routes";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route index element={<OverviewPage />} />
          <Route element={<ListedPropertyPage />} path={paths.listedProperty} />
          <Route element={<ListingGoldPage />} path={paths.listingGold} />
          <Route
            element={<ListingRealEstatePage />}
            path={paths.listingRealEstate}
          />
          <Route element={<ListingCarbonPage />} path={paths.listingCarbon} />

          <Route
            element={<BatchReconciliationPage />}
            path={paths.batchReconciliation}
          />
          <Route element={<PricingPage />} path={paths.pricing} />
          <Route element={<KYCPage />} path={paths.kyc} />
        </Route>
        <Route
          element={<Navigate replace to={paths.listedProperty} />}
          path="*"
        />
      </Routes>
    </BrowserRouter>
  );
};
