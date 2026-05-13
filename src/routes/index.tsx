import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  BatchReconciliationPage,
  ListedPropertyPage,
  OverviewPage,
  PricingPage,
} from "@/pages";
import { paths } from "./paths";
import { ProtectedRoutes } from "./protected-routes";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route index element={<OverviewPage />} />
          <Route element={<ListedPropertyPage />} path={paths.listedProperty} />
          <Route
            element={<BatchReconciliationPage />}
            path={paths.batchReconciliation}
          />
          <Route element={<PricingPage />} path={paths.pricing} />
        </Route>
        <Route
          element={<Navigate replace to={paths.listedProperty} />}
          path="*"
        />
      </Routes>
    </BrowserRouter>
  );
};
