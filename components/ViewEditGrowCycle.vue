<template>
  <div>
    <v-row justify="center">
      <v-col cols="10">
        <v-card class="pa-6">
          <v-form ref="form" class="mx-2" lazy-validation>
            <v-row>
              <v-col>
                <v-autocomplete
                  v-model="seedType"
                  :readonly="mode === 'view'"
                  :rules="rules"
                  :items="seedTypes"
                  item-text="name"
                  item-value="value"
                  label="Seed Types"
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="variety"
                  :readonly="mode === 'view'"
                  :rules="rules"
                  :items="seedVarieties"
                  item-text="name"
                  item-value="value"
                  label="Variety"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="seedBatch"
                  :readonly="mode === 'view'"
                  label="Seed Batch"
                  hide-details="auto"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="numberOfTrays"
                  :readonly="mode === 'view'"
                  :rules="rules"
                  label="Number of trays"
                  hide-details="auto"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="sowingWeight"
                  :readonly="mode === 'view'"
                  :rules="rules"
                  label="Sowing Weight"
                  hide-details="auto"
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="seedMedium"
                  :readonly="mode === 'view'"
                  :rules="rules"
                  :items="seedMediums"
                  item-text="name"
                  item-value="value"
                  label="Seed Medium"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="soakDurationInHours"
                  :readonly="mode === 'view'"
                  :rules="rules"
                  label="Soak duration (hours)"
                  hide-details="auto"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="weightUsed"
                  :readonly="mode === 'view'"
                  :rules="rules"
                  label="Weight used"
                  hide-details="auto"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="germinationDurationInDays"
                  :readonly="mode === 'view'"
                  label="Germination duration (days)"
                  hide-details="auto"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="blackOutDurationInDays"
                  :readonly="mode === 'view'"
                  label="Blackout duration (days)"
                  hide-details="auto"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="daysToHarvest"
                  :readonly="mode === 'view'"
                  label="Days to harvest"
                  hide-details="auto"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="harvestWeight"
                  :readonly="mode === 'view'"
                  label="Harvest weight"
                  hide-details="auto"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="startDate"
                  :readonly="mode === 'view'"
                  :rules="rules"
                  v-mask="'##/##/#### ##:##'"
                  label="Start Date"
                  hide-details="auto"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="harvestDate"
                  :readonly="mode === 'view'"
                  v-mask="'##/##/#### ##:##'"
                  label="Harvest Date"
                  hide-details="auto"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-autocomplete
                  v-model="harvestMethod"
                  :readonly="mode === 'view'"
                  :items="harvestMethods"
                  item-text="name"
                  item-value="value"
                  label="Harvest Methods"
                />
              </v-col>
              <v-col>
                <v-text-field v-model="note" label="Notes" />
              </v-col>
            </v-row>
            <v-alert v-if="success" outlined type="success" text>
              Your grow cycle has been successfully created
            </v-alert>
            <v-alert v-if="success === false" outlined type="error" text>
              There was an error creating your grow cycle. Please try again
              later.
            </v-alert>

            <v-btn
              v-if="mode && mode === 'edit'"
              :disabled="success"
              @click="submitForm"
              color="green"
            >
              <v-icon>{{ mdiSendCheck }}</v-icon>
              &nbsp; Submit
            </v-btn>
            <v-btn
              v-if="!mode"
              :disabled="success"
              @click="submitForm"
              color="green"
            >
              <v-icon>{{ mdiSproutOutline }}</v-icon>
              &nbsp; click to create
            </v-btn>
            <v-btn v-if="success" @click="handleReset" color="blue">
              <v-icon>{{ mdiPlusThick }}</v-icon>
              &nbsp; Add another grow cycle
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
.v-dialog {
  overflow-y: hidden !important;
}
</style>

<script lang="ts">
import { Component, Vue, Prop, namespace, State } from 'nuxt-property-decorator'
// import { MetaInfo } from 'vue-meta'

// import type { RootState } from '../store'
// import {
// 	namespace as settingStoreNamespace,
// 	SettingState,
// 	actionType,
// } from '../store/setting'
import axios from 'axios'
import { GrowCycle, SeedBatch, SeedTypes, Varieties } from '~/types/types'
// const seedTypes = require('../assets/seedTypes.json')
import seedTypes from '~/assets/seedTypes'
import varieties from '~/assets/varieties'
import seedMediums from '~/assets/seedMediums'
import harvestMethods from '~/assets/harvestMethods'
import moment from 'moment'
import { mdiPlusThick, mdiSproutOutline, mdiSendCheck } from '@mdi/js'

// const SettingStore = namespace(settingStoreNamespace)

@Component({})
export default class ViewEditGrowCycle extends Vue {
  @Prop({})
  growCycle!: GrowCycle
  @Prop({ default: '' })
  mode!: 'view' | 'edit'

  public success: boolean | null = null

  public mdiPlusThick = mdiPlusThick
  public mdiSproutOutline = mdiSproutOutline
  public mdiSendCheck = mdiSendCheck

  // @State('description') descriptionOnStore!: RootState['description']
  // @SettingStore.Action(actionType.TOGGLE_DARK_MODE)
  // toggleDarkMode!: () => void
  // @SettingStore.State('darkMode') isDarkMode!: SettingState['darkMode']
  public seedTypes = seedTypes
  public varieties = varieties
  public seedMediums = seedMediums
  public harvestMethods = harvestMethods

  public growCycles = [] as GrowCycle[]

  public seedType = (this.growCycle && this.growCycle.seedType) || ''
  public variety = (this.growCycle && this.growCycle.variety) || ''

  public seedBatch = ''
  public numberOfTrays =
    (this.growCycle && this.growCycle.numberOfTrays) || null

  public sowingWeight =
    this.growCycle &&
    this.growCycle.sowingWeight &&
    this.growCycle.sowingWeight.amount

  public seedMedium = (this.growCycle && this.growCycle.seedMedium) || ''

  public soakDurationInHours =
    (this.growCycle && this.growCycle.soakDurationInHours) || null

  public germinationDurationInDays =
    (this.growCycle && this.growCycle.germinationDurationInDays) || null

  public weightUsed = (this.growCycle && this.growCycle.weightUsed) || 'paver'
  // public didStackTrays = ''
  public blackOutDurationInDays =
    (this.growCycle && this.growCycle.blackOutDurationInDays) || ''
  // public dailyLightDurationInHours = ''
  public daysToHarvest = this.growCycle && this.growCycle.daysToHarvest
  public harvestWeight =
    (this.growCycle &&
      this.growCycle.harvestWeight &&
      this.growCycle.harvestWeight.amount) ||
    null
  // public percentageIncreaseOverSeedWeight = ''
  // public completed = false
  public startDate =
    (this.growCycle && this.growCycle.startDate) ||
    moment().format('MM/DD/YYYY HH:mm')

  public harvestDate = this.growCycle && this.growCycle.harvestDate
  public harvestMethod = this.growCycle && this.growCycle.harvestMethod
  public note = ''

  rules = [(v: any) => !!v || 'Required']

  public get seedVarieties () {
    return this.seedType
      ? this.varieties[this.seedType as keyof typeof varieties]
      : [{ name: 'Please Choose a seed type' }]
  }

  async createNewGrowCycle () {
    const newGrowCycle: GrowCycle = {
      seedType: this.seedType as SeedTypes,
      variety: this.variety,
      // seedBatch: (this.seedBatch as unknown) as SeedBatch,
      numberOfTrays: +this.numberOfTrays!,
      sowingWeight: {
        amount: this.sowingWeight || 0,
        unit: 'grams'
      },
      seedMedium: this.seedMedium,
      soakDurationInHours: +this.soakDurationInHours!,
      weightUsed: this.weightUsed,
      germinationDurationInDays: +this.germinationDurationInDays!,
      blackOutDurationInDays: +this.blackOutDurationInDays!,
      daysToHarvest: 10,
      harvestWeight: {
        amount: +this.harvestWeight!,
        unit: 'grams'
      },
      didStackTrays: true,
      dailyLightDurationInHours: 16,
      startDate: '2021-05-02T03:44:47.492Z',
      harvestDate: this.harvestDate,
      harvestMethod: 'knife',
      completed: false,
      dailyEnvironmentalConditions: [],
      dailyWaterUsage: [],
      // dailyGrowNotes: [{ note: this.note, dateTime: moment().format('L') }],
      percentageIncreaseOverSeedWeight: 200
    }
    await axios
      .post('/api/createNewGrowCycle', newGrowCycle)
      .then(result => {
        this.growCycles = [...this.growCycles, result.data]
      })
      .catch(error =>
        console.log('error from createNewGrowCycle front end', error)
      )
  }

  // message = "I'm defined on data()"
  // fetchedTodos: ToDo[] = []
  // asyncMessage = 'I will be overwritten by asyncData'
  // userAgent = 'I will be overwritten by asyncData'

  // get computedMessage(): string {
  // 	return this.message.replace('data()', 'computed()')
  // }
  public handleReset () {
    this.success = null
    ;(this.$refs.form as any).reset()
  }

  public async submitForm () {
    if ((this.$refs.form as any).validate()) {
      await this.createNewGrowCycle()
      this.success = true
    }
  }
}
</script>
