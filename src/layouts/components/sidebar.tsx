import { useLocation, useNavigate } from "react-router-dom";
import { useAdminStore } from "@/hooks/use-admin-store";
import { cn } from "@/lib/utils";
import { paths } from "@/routes/paths";
import { navigationItems } from "../constants/navigation-items";
import { Grid2X2 } from "lucide-react";

type SidebarProps = {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
};

export const Sidebar = ({ isMobileOpen, onCloseMobile }: SidebarProps) => {
  const { setActiveModule } = useAdminStore();

  const location = useLocation();
  const navigate = useNavigate();

  const activeModuleId =
    location.pathname === paths.batchReconciliation
      ? "batch-reconciliation"
      : location.pathname === paths.listedProperty
        ? "listed-property"
        : "overview";

  const handleNavigate = (moduleId: string) => {
    setActiveModule(moduleId);
    onCloseMobile();

    if (moduleId === "overview") {
      navigate(paths.overview);
      return;
    }

    if (moduleId === "batch-reconciliation") {
      navigate(paths.batchReconciliation);
      return;
    }

    navigate(paths.listedProperty);
  };

  return (
    <>
      <button
        aria-label="Đóng menu"
        className={cn(
          "fixed inset-0 z-30 bg-black/35 transition-opacity lg:hidden",
          isMobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={onCloseMobile}
        type="button"
      />

      <aside
        id="mobile-sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-sidebar-w flex-col bg-bidv-green text-white transition-transform lg:z-30",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
      >
        <div className="flex h-topbar-h items-center gap-2.5 border-b border-white/8 px-4 font-display">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-bidv-gold text-sm font-display font-extrabold text-bidv-green">
            B
          </div>

          <div className="min-w-0 font-display text-[15px] font-bold tracking-tight">
            <div className="truncate">BIDV RWA</div>

            <div className="mt-0.25 text-[10px] font-medium uppercase tracking-widest text-white opacity-50">
              Admin Console
            </div>
          </div>
        </div>

        <nav aria-label="Module nghiệp vụ" className="flex-1">
          <button
            aria-current={activeModuleId === "overview" ? "page" : undefined}
            className={cn(
              "relative mx-auto! my-px! flex w-[calc(100%-16px)] items-center gap-3 rounded-md px-3.5 py-[9px] text-left text-[13px]! font-medium! transition-colors cursor-pointer",
              "text-white/78!",
              activeModuleId !== "overview" &&
                "hover:bg-white/6! hover:text-white!",
              activeModuleId === "overview" &&
                "bg-white/10! text-white! font-semibold!",
            )}
            onClick={() => handleNavigate("overview")}
            type="button"
          >
            <Grid2X2 className="h-[18px] w-[18px] text-inherit" />
            Tổng quan
          </button>

          <div className="px-3 pb-1.5 pt-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
            Module nghiệp vụ
          </div>

          <div className="flex flex-col">
            {navigationItems.slice(1).map((item) => {
              const Icon = item.icon;
              const isActive = activeModuleId === item.id;

              return (
                <button
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative mx-auto! my-px! flex w-[calc(100%-16px)] items-center gap-3 rounded-md px-3.5 py-[9px] text-left text-[13px]! font-medium! transition-colors cursor-pointer",
                    "text-white/78!",
                    !isActive && "hover:bg-white/6! hover:text-white!",
                    isActive && "bg-white/10! font-semibold! text-white!",
                    item.disabled && "cursor-not-allowed opacity-40",
                  )}
                  disabled={item.disabled ?? false}
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  type="button"
                >
                  <Icon className="h-[18px] w-[18px] text-inherit" />

                  <span className="min-w-0 flex-1 truncate">{item.label}</span>

                  {item.badge ? (
                    <span className="ml-auto flex min-w-[17px] items-center justify-center rounded-xs bg-bidv-gold px-1.5 py-px text-[10px] font-bold text-bidv-green">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="m-4 mt-auto rounded-md bg-white/4 p-3 text-[11px] text-white/65">
          <div className="mb-1 flex items-center gap-1.5 text-white font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5ed29a]" />
            Testnet · Polygon Mumbai
          </div>

          <div className="font-mono text-[10.5px] opacity-70">
            Block #5,284,729
          </div>
        </div>
      </aside>
    </>
  );
};
