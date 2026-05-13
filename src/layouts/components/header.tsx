import { Button } from 'antd'
import {
  Bell,
  CreditCard,
  Menu,
  Search,
  Settings,
} from 'lucide-react'

export const Header = () => {
  return (
    <header className="sticky top-0 z-20 flex h-[51px] items-center justify-between border-b border-app-border bg-white px-4 lg:px-6">
      <div className="flex min-w-0 items-center gap-4">
        <Button
          aria-label="Mở menu"
          className="!inline-flex !h-9 !w-9 !items-center !justify-center !border-0 !bg-transparent !p-0 lg:!hidden"
          icon={<Menu className="h-5 w-5" />}
          type="text"
        />

        <div className="hidden text-sm text-muted-text md:block">
          Module E <span className="mx-2 text-app-border">/</span>

          <span className="font-semibold text-[#12201a]">
            Niêm yết tài sản
          </span>
        </div>

        <label className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-text" />

          <input
            className="h-9 w-[360px] rounded-md border border-transparent bg-[#f1f4f2] pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-[#7d8a85] focus:border-bidv-green"
            placeholder="Tìm theo mã tài sản, tx hash, nhà đầu tư..."
            type="search"
          />
        </label>
      </div>

      <div className="flex items-center gap-3">
        <Button
          aria-label="Thông báo"
          className="relative !h-9 !w-9 !border-0 !bg-transparent !p-0"
          type="text"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-bidv-gold" />
        </Button>

        <Button
          aria-label="Cài đặt"
          className="!h-9 !w-9 !border-0 !bg-transparent !p-0"
          icon={<Settings className="h-5 w-5" />}
          type="text"
        />

        <Button
          className="!hidden !h-[30px] !rounded-full !px-4 !text-xs md:!inline-flex"
          type="primary"
        >
          <CreditCard className="h-3.5 w-3.5" />
          Kết nối ví Admin
        </Button>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e7efea] text-xs font-bold text-bidv-green">
          NA
        </div>

        <div className="hidden leading-tight md:block">
          <div className="text-sm font-semibold">Nguyễn Anh</div>

          <div className="text-xs text-muted-text">
            Sản phẩm Vàng
          </div>
        </div>
      </div>
    </header>
  )
}