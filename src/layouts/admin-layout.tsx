import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";

import { Header, Sidebar } from "./components";

type AdminLayoutProps = {
  children?: ReactNode;
};

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-app-bg text-[#06120f]">
      <Sidebar />

      <div className="lg:pl-[238px]">
        <Header />

        <main className="min-h-[calc(100vh-51px)] px-4 py-7 lg:px-8">{children ?? <Outlet />}</main>
      </div>
    </div>
  );
};
