const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

export interface GrowCycle {
  _id?: typeof ObjectId;
  seedType?: SeedTypes
  variety?: string
  seedBatch?: typeof ObjectId

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
  dailyEnvironmentalConditions?: typeof ObjectId
  dailyWaterUsage?: typeof ObjectId
  dailyGrowNotes?: typeof ObjectId
}

export interface SeedBatch {
  _id?: typeof ObjectId
  seedType?: SeedTypes
  variety?: Varieties
  brand?: string
  purchasedFrom?: string
  purchaseDate?: string
  shippingTimeInDays?: number | null
  quantity?: Quantity
  totalPrice?: number | null
  pricePerPound?: number | null
  germinationTestDate?: number | null
  germinationPercent?: number | null
  isUsedUp?: boolean
}

export interface DailyEnvironmentalConditions {
  temperatureUnit: 'f' | 'c'
  temperatureLow: number | null
  temperatureHigh: number | null
  humidityLow: number | null
  humidityHigh: number | null
  dateTime: string
  hadFan: boolean
  notes: string
}

export interface DailyWaterUsage {
  wateringMethod: WaterMethod
  dateTime: string
  quantity: number | null
  units: Units
  hadNutrients: boolean
  notes: string
}

export interface DailyGrowNotes {
  _id: typeof ObjectId
  message: string
  dateTime: string
}

export interface Quantity {
  amount: number | null
  units: Units
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

export type WaterMethod = 'top water' | 'bottom water' | 'root mist' | 'foliar'

export type Units = 'ounces' | 'cups' | 'pounds' | 'grams' | 'millileters'
