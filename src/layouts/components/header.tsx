import { Button } from "antd";

import { shortenAddress } from "@/lib/wagmi";
import { Bell, CreditCard, Menu, Search, Settings } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import { getHeaderBreadcrumbs } from "@/layouts/constants/breadcrumbs";
import { useState } from "react";
import { ConnectWalletModal } from "@/pages/listed-property/components/ConnectWalletModal";

type HeaderProps = {
  isMobileSidebarOpen: boolean;
  onToggleMobileSidebar: () => void;
};

export const Header = ({
  isMobileSidebarOpen,
  onToggleMobileSidebar,
}: HeaderProps) => {
  const location = useLocation();
  const { address, isConnected } = useAccount();
  const { connectors, connect, status } = useConnect();
  const { disconnect } = useDisconnect();
  const [showConnectModal, setShowConnectModal] = useState(false);

  const breadcrumbs = getHeaderBreadcrumbs(location.pathname);

  return (
    <header className="sticky top-0 z-20 flex h-topbar-h items-center gap-4 border-b border-app-border bg-white px-6">
      <Button
        aria-label="Mở menu"
        className="inline-flex! h-9! w-9! items-center! justify-center! border-0! bg-transparent! p-0! lg:hidden!"
        icon={<Menu className="h-5 w-5" />}
        onClick={onToggleMobileSidebar}
        aria-expanded={isMobileSidebarOpen}
        aria-controls="mobile-sidebar"
        type="text"
      />

      <div className="hidden items-center gap-2 text-[13px] text-text-3 md:flex">
        {breadcrumbs.map((crumb, index) => (
          <div className="contents" key={`${crumb}-${index}`}>
            {index > 0 ? <span className="text-text-disabled">/</span> : null}
            {index === breadcrumbs.length - 1 ? (
              <span className="font-semibold text-text">{crumb}</span>
            ) : (
              <span>{crumb}</span>
            )}
          </div>
        ))}
      </div>

      <label className="relative ml-4 hidden max-w-[360px] flex-1 md:block">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-[13px] w-[13px] -translate-y-1/2 text-text-3" />

        <input
          className="h-8 w-full rounded-md border border-transparent bg-app-bg pl-8 pr-3 text-[13px] outline-none transition-colors placeholder:text-text-3 focus:bg-white focus:border-bidv-green"
          placeholder="Tìm theo mã tài sản, tx hash, nhà đầu tư..."
          type="search"
        />
      </label>

      <div className="ml-auto flex items-center gap-2">
        <Button
          aria-label="Thông báo"
          className="relative! inline-flex! h-8! w-8! items-center! justify-center! rounded-md! border-0! bg-transparent! p-0! leading-none! text-text-2! hover:bg-app-bg! hover:text-text! cursor-pointer"
          type="text"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-bidv-gold" />
        </Button>

        <Button
          aria-label="Cài đặt"
          className="inline-flex! h-8! w-8! items-center! justify-center! rounded-md! border-0! bg-transparent! p-0! leading-none! text-text-2! hover:bg-app-bg! hover:text-text! cursor-pointer"
          type="text"
        >
          <Settings className="h-[18px] w-[18px]" />
        </Button>

        <div className="hidden h-[22px] w-px bg-app-border md:block" />

        {isConnected && address ? (
          <div className="flex items-center gap-2 border border-app-bg bg-app-bg p-1 rounded-full">
            <div className="w-5 h-5 rounded-full bg-amber-700"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-bidv-green"></div>
            <div>{shortenAddress(address)}</div>
            <Button onClick={() => disconnect()}>Disconnect Wallet</Button>
          </div>
        ) : (
          <Button
            className="!hidden !h-[30px] !rounded-full !px-4 !text-xs md:!inline-flex"
            type="primary"
            disabled={status === "pending"}
            onClick={() => setShowConnectModal(true)}
          >
            <CreditCard className="h-3.5 w-3.5" />
            Kết nối ví Admin
          </Button>
        )}

        <div className="flex cursor-pointer items-center gap-2 rounded-full p-1 pr-2.5 transition-colors hover:bg-app-bg">
          <div className="grid h-7 w-7 place-items-center rounded-full bg-primary-50 text-[11px] font-semibold text-bidv-green">
            NA
          </div>

          <div className="hidden md:block">
            <div className="text-[12.5px] font-medium text-text">
              Nguyễn Anh
            </div>
            <div className="text-[10.5px] text-text-3">Sản phẩm Vàng</div>
          </div>
        </div>
      </div>

      <ConnectWalletModal
        open={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        onConnect={() => connect({ connector: connectors[0] })}
      />
    </header>
  );
};
