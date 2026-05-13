import {
  CircleDollarSign,
  Clock3,
  Grid2X2,
  List,
  SlidersHorizontal,
  UserRoundCheck,
} from 'lucide-react'

export const navigationItems = [
  { badge: undefined, icon: Grid2X2, id: 'overall', label: 'Tổng quan' },
  { badge: 'E', icon: List, id: 'listed-property', label: 'Niêm yết tài sản' },
  { badge: 'B', icon: SlidersHorizontal, id: 'batch-reconciliation', label: 'Đối soát batch' },
  { badge: 'A', disabled: true, icon: UserRoundCheck, id: 'kyc', label: 'Quản lý KYC' },
  { badge: 'C', disabled: true, icon: CircleDollarSign, id: 'pricing', label: 'Cập nhật giá' },
  { badge: 'D', disabled: true, icon: Clock3, id: 'limits', label: 'Hạn mức' },
]