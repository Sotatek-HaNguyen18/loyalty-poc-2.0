import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";

import { Header, Sidebar } from "./components";

type AdminLayoutProps = {
  children?: ReactNode;
};

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="lg:pl-sidebar-w">
        <Header />
        <main className="min-h-[calc(100vh-var(--topbar-h))] px-6 py-6 pb-20 lg:px-8">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
};
