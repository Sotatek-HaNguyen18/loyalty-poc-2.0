import { useEffect, type ReactNode } from 'react'
import { Button } from 'antd'
import {
  Bell,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Grid2X2,
  List,
  Menu,
  Search,
  Settings,
  SlidersHorizontal,
  UserRoundCheck,
} from 'lucide-react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAdminStore } from '@/hooks/use-admin-store'
import { cn } from '@/lib/utils'
import { paths } from '@/routes/paths'

type AdminLayoutProps = {
  children?: ReactNode
}

const navigationItems = [
  { badge: undefined, icon: Grid2X2, id: 'overall', label: 'Tổng quan' },
  { badge: 'E', icon: List, id: 'listed-property', label: 'Niêm yết tài sản' },
  { badge: 'B', icon: SlidersHorizontal, id: 'batch-reconciliation', label: 'Đối soát batch' },
  { badge: 'A', disabled: true, icon: UserRoundCheck, id: 'kyc', label: 'Quản lý KYC' },
  { badge: 'C', disabled: true, icon: CircleDollarSign, id: 'pricing', label: 'Cập nhật giá' },
  { badge: 'D', disabled: true, icon: Clock3, id: 'limits', label: 'Hạn mức' },
]

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { activeModule, setActiveModule } = useAdminStore()
  const location = useLocation()
  const navigate = useNavigate()
  const activeModuleId =
    location.pathname === paths.batchReconciliation
      ? 'batch-reconciliation'
      : location.pathname === paths.listedProperty
        ? 'listed-property'
        : 'overall'

  useEffect(() => {
    setActiveModule(activeModuleId)
  }, [activeModuleId, setActiveModule])

  const handleNavigate = (moduleId: string) => {
    setActiveModule(moduleId)

    if (moduleId === 'overall') {
      navigate(paths.overall)
      return
    }

    if (moduleId === 'batch-reconciliation') {
      navigate(paths.batchReconciliation)
      return
    }

    navigate(paths.listedProperty)
  }

  return (
    <div className="min-h-screen bg-app-bg text-[#06120f]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[238px] flex-col bg-bidv-green text-white lg:flex">
        <div className="flex h-[51px] items-center gap-3 border-b border-white/10 px-3.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-bidv-gold text-xs font-black">
            B
          </div>
          <div>
            <div className="text-sm font-bold leading-4">BIDV RWA</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/55">
              Admin Console
            </div>
          </div>
        </div>

        <nav aria-label="Module nghiệp vụ" className="flex-1 px-2 pt-3">
          <button
            aria-current={activeModule === 'overall' ? 'page' : undefined}
            className="mb-6 flex h-8 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-semibold text-white/95 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70"
            onClick={() => handleNavigate('overall')}
            type="button"
          >
            <Grid2X2 aria-hidden="true" className="h-4 w-4" />
            Tổng quan
          </button>

          <div className="mb-2 px-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#65a083]">
            Module nghiệp vụ
          </div>

          <div className="space-y-1">
            {navigationItems.slice(1).map((item) => {
              const Icon = item.icon
              const isActive = activeModule === item.id

              return (
                <button
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex h-[37px] w-full items-center gap-3 rounded-md px-3 text-left text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70',
                    isActive ? 'bg-white/13 text-white' : 'text-white/45 hover:bg-white/8 hover:text-white',
                  )}
                  disabled={item.disabled}
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  type="button"
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {item.badge ? (
                    <span className="flex h-[17px] min-w-[17px] items-center justify-center rounded bg-bidv-gold px-1 text-[10px] font-bold text-bidv-green">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>
        </nav>

        <div className="m-3 rounded-md bg-white/7 p-3 text-xs">
          <div className="mb-2 flex items-center gap-2 font-semibold">
            <span className="h-2 w-2 rounded-full bg-[#4ade80]" />
            Testnet · Polygon Mumbai
          </div>
          <div className="font-mono text-[11px] text-white/50">Block #5,284,729</div>
        </div>
      </aside>

      <div className="lg:pl-[238px]">
        <header className="sticky top-0 z-20 flex h-[51px] items-center justify-between border-b border-app-border bg-white px-4 lg:px-6">
          <div className="flex min-w-0 items-center gap-4">
            <Button
              aria-label="Mở menu"
              className="!inline-flex !h-9 !w-9 !items-center !justify-center !border-0 !bg-transparent !p-0 lg:!hidden"
              icon={<Menu aria-hidden="true" className="h-5 w-5" />}
              type="text"
            />
            <div className="hidden text-sm text-muted-text md:block">
              Module E <span className="mx-2 text-app-border">/</span>
              <span className="font-semibold text-[#12201a]">Niêm yết tài sản</span>
            </div>
            <label className="relative hidden md:block">
              <span className="sr-only">Tìm kiếm tài sản</span>
              <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-text" />
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
              <Bell aria-hidden="true" className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-bidv-gold" />
            </Button>
            <Button
              aria-label="Cài đặt"
              className="!h-9 !w-9 !border-0 !bg-transparent !p-0"
              icon={<Settings aria-hidden="true" className="h-5 w-5" />}
              type="text"
            />
            <Button className="!hidden !h-[30px] !rounded-full !px-4 !text-xs md:!inline-flex" type="primary">
              <CreditCard aria-hidden="true" className="h-3.5 w-3.5" />
              Kết nối ví Admin
            </Button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e7efea] text-xs font-bold text-bidv-green">
              NA
            </div>
            <div className="hidden leading-tight md:block">
              <div className="text-sm font-semibold">Nguyễn Anh</div>
              <div className="text-xs text-muted-text">Sản phẩm Vàng</div>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-51px)] px-4 py-7 lg:px-8">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  )
}
