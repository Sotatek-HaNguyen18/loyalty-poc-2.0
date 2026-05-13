import type { ReactNode } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Header, Sidebar } from "./components";

type AdminLayoutProps = {
  children?: ReactNode;
};

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />
      <div className="lg:pl-sidebar-w">
        <Header
          isMobileSidebarOpen={isMobileSidebarOpen}
          onToggleMobileSidebar={() =>
            setIsMobileSidebarOpen((previousState) => !previousState)
          }
        />
        <main className="min-h-[calc(100vh-var(--topbar-h))] px-6 py-6 pb-20 lg:px-8">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
};
