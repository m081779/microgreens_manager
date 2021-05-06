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
                  v-model="startDate"
                  :readonly="mode === 'view'"
                  :rules="rules"
                  v-mask="'##/##/#### ##:##'"
                  label="Start Date"
                  hide-details="auto"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
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
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

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
import {
  GrowCycle,
  SeedBatch,
  SeedTypes,
  Varieties,
  Units
} from '~/types/types'
// const seedTypes = require('../assets/seedTypes.json')
import seedTypes from '~/assets/seedTypes'
import varieties from '~/assets/varieties'
import seedMediums from '~/assets/seedMediums'
import harvestMethods from '~/assets/harvestMethods'
import moment from 'moment'
import { mdiPlusThick, mdiSproutOutline, mdiSendCheck } from '@mdi/js'

// const SettingStore = namespace(settingStoreNamespace)

@Component({})
export default class CreateGrowCycle extends Vue {
  public success: boolean | null = null

  public mdiPlusThick = mdiPlusThick
  public mdiSproutOutline = mdiSproutOutline
  public mdiSendCheck = mdiSendCheck

  public seedTypes = seedTypes
  public varieties = varieties
  public seedMediums = seedMediums
  public harvestMethods = harvestMethods

  public growCycles = [] as GrowCycle[]

  public seedType = ''
  public variety = ''
  public seedBatch = ''
  public numberOfTrays = null
  public sowingWeight = null
  public seedMedium = ''
  public soakDurationInHours = null
  public weightUsed = 'paver'
  public startDate = moment().format('MM/DD/YYYY HH:mm')
  // public didStackTrays = ''

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
      germinationDurationInDays: null,
      blackOutDurationInDays: null,
      daysToHarvest: 10,
      harvestWeight: {
        amount: null,
        unit: '' as Units
      },
      didStackTrays: true,
      dailyLightDurationInHours: 16,
      startDate: '2021-05-02T03:44:47.492Z',
      harvestDate: '',
      harvestMethod: '',
      completed: false,
      dailyEnvironmentalConditions: [],
      dailyWaterUsage: [],
      dailyGrowNotes: [],
      percentageIncreaseOverSeedWeight: null
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
