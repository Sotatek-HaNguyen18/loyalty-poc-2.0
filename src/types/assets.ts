export type AssetCategory = 'gold' | 'real-estate' | 'carbon'

export type AssetStatus = 'trading' | 'paused' | 'draft'

export type ListedAsset = {
  action: 'pause' | 'resume' | 'continue'
  backing: string
  category: AssetCategory
  categoryLabel: string
  currentPrice?: string
  id: string
  issued: string
  listedDate?: string
  name: string
  owner?: string
  status: AssetStatus
  txHash?: string
  unit: string
}
