export interface GrowCycle {
  seedType?: SeedTypes
  variety?: string
  seedBatch?: SeedBatch
  numberOfTrays?: number | null
  sowingWeight?: Quantity
  seedMedium?: string
  soakDurationInHours?: number | null
  germinationDurationInDays?: Number | null
  weightUsed?: string
  didStackTrays?: boolean
  blackOutDurationInDays?: number | null
  dailyLightDurationInHours?: number | null
  daysToHarvest?: number | null
  harvestWeight?: Quantity
  percentageIncreaseOverSeedWeight?: number | null
  completed: boolean
  startDate?: string
  harvestDate?: string
  harvestMethod?: string
  dailyEnvironmentalConditions?: DailyEnvironmentalConditions[]
  dailyWaterUsage?: DailyWaterUsage[]
  dailyGrowNotes?: DailyGrowNotes[]
}

export interface SeedBatch {
  purchasedFrom: string
  seedType: SeedTypes
  variety: Varieties
  purchaseDate: string
  shippingTimeInDays: number
  quantity: Quantity
  totalPrice: number
  pricePerPound: number
  germinationTestDate: number
  germinationPercent: number
}

export interface DailyEnvironmentalConditions {
  temperatureUnit: 'f' | 'c'
  temperatureLow: number
  temperatureHigh: number
  humidityLow: number
  humidityHigh: number
  hadFan: boolean
  notes: string[]
}

export interface DailyWaterUsage {
  wateringMethod: string
  dateTime: string
  quantity: number
  units: Units
  hadNutrients: boolean
  notes: string[]
}

export interface DailyGrowNotes {
  note: string
  dateTime: string
}

export interface Quantity {
  amount: number | null
  unit: Units
}

export type SeedTypes =
  | 'sunflower'
  | 'pea'
  | 'radish'
  | 'wheatGrass'
  | 'broccoli'

export type Varieties =
  | 'black oil'
  | 'speckled'
  | 'rambo'
  | 'hard red'
  | 'hard white'
  | 'some variety'

export type SeedMedium = 'Coco coir' | 'kratke' | 'promix'

export type HarvestMethod = 'knife' | 'scissors'

export type Units = 'ounces' | 'cups' | 'pounds' | 'grams' | 'millileters'
