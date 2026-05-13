
import { Grid2X2 } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAdminStore } from '@/hooks/use-admin-store'
import { cn } from '@/lib/utils'
import { paths } from '@/routes/paths'
import { navigationItems } from '../constants/navigation-items'

export const Sidebar = () => {
  const { activeModule, setActiveModule } = useAdminStore()

  const location = useLocation()
  const navigate = useNavigate()

  const activeModuleId =
    location.pathname === paths.batchReconciliation
      ? 'batch-reconciliation'
      : location.pathname === paths.listedProperty
        ? 'listed-property'
        : 'overall'

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
          className="mb-6 flex h-8 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-semibold text-white/95 hover:bg-white/10"
          onClick={() => handleNavigate('overall')}
          type="button"
        >
          <Grid2X2 className="h-4 w-4" />
          Tổng quan
        </button>

        <div className="mb-2 px-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#65a083]">
          Module nghiệp vụ
        </div>

        <div className="space-y-1">
          {navigationItems.slice(1).map((item) => {
            const Icon = item.icon
            const isActive = activeModuleId === item.id

            return (
              <button
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex h-[37px] w-full items-center gap-3 rounded-md px-3 text-left text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-white/13 text-white'
                    : 'text-white/45 hover:bg-white/8 hover:text-white',
                )}
                disabled={item.disabled}
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                type="button"
              >
                <Icon className="h-4 w-4" />

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

        <div className="font-mono text-[11px] text-white/50">
          Block #5,284,729
        </div>
      </div>
    </aside>
  )
}