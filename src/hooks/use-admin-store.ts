import { create } from 'zustand'

type AdminState = {
  activeModule: string
  setActiveModule: (moduleName: string) => void
}

export const useAdminStore = create<AdminState>((set) => ({
  activeModule: 'listed-property',
  setActiveModule: (moduleName) => set({ activeModule: moduleName }),
}))
