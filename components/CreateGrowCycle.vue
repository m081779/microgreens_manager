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
                  v-model="startDate"
                  :rules="rules"
                  v-mask="'##/##/#### ##:##'"
                  label="Start Date"
                  hide-details="auto"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="numberOfTrays"
                  :rules="rules"
                  label="Number of trays"
                  hide-details="auto"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="sowingQuantity.amount"
                  :rules="rules"
                  label="Sowing Weight"
                  hide-details="auto"
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="sowingQuantity.units"
                  :rules="rules"
                  :items="units"
                  item-text="name"
                  item-value="value"
                  label="Unit"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="soakDurationInHours"
                  :rules="rules"
                  label="Soak duration (hours)"
                  hide-details="auto"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="weightUsed"
                  :rules="rules"
                  label="Weight used"
                  hide-details="auto"
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="seedMedium"
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
                <v-autocomplete
                  v-model="seedBatch"
                  :rules="rules"
                  :items="seedBatches"
                  item-text="name"
                  item-value="value"
                  label="Seed Batch"
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

                <v-btn :disabled="success" @click="submitForm" color="green">
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
import axios from 'axios'
import {
  GrowCycle,
  SeedBatch,
  SeedTypes,
  Varieties,
  Units,
  Quantity
} from '~/types/types'
// const seedTypes = require('../assets/seedTypes.json')
import seedTypes from '~/assets/seedTypes'
import varieties from '~/assets/varieties'
import seedMediums from '~/assets/seedMediums'
import harvestMethods from '~/assets/harvestMethods'
import units from '~/assets/units'
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
  public units = units

  public growCycles = [] as GrowCycle[]

  public seedType = ''
  public variety = ''
  public seedBatch = ''
  public numberOfTrays = null
  public sowingQuantity = {
    amount: null,
    units: '' as Units
  } as Quantity
  public seedMedium = ''
  public soakDurationInHours = null
  public weightUsed = 'paver'
  public startDate = moment().format('MM/DD/YYYY HH:mm')
  // public didStackTrays = ''

  rules = [(v: any) => !!v || 'Required']

  public get seedBatches () {
    let filteredBatches: any[] = []
    if (this.seedType && this.variety) {
      this.$store.dispatch('seedBatch/getSeedBatchesBySeedType', {
        seedType: this.seedType,
        variety: this.variety,
        seedBatches: this.$store.state.seedBatch.seedBatches
      })
      filteredBatches = this.$store.state.seedBatch.filteredBatches.map((batch: SeedBatch) => ({
        name: `${batch.brand} (${batch.seedType} - ${batch.variety}) ${moment(batch.purchaseDate).format('L')}`,
        value: batch._id
      }));
    }
    return this.seedType && this.variety ? filteredBatches : [{ name: 'Please Choose a seed type and variety' }]
  }

  public get seedVarieties () {
    return this.seedType
      ? this.varieties[this.seedType as keyof typeof varieties]
      : [{ name: 'Please Choose a seed type' }]
  }

  async createNewGrowCycle () {
    const newGrowCycle: GrowCycle = {
      seedType: this.seedType as SeedTypes,
      variety: this.variety,
      seedBatch: this.seedBatch,
      numberOfTrays: +this.numberOfTrays!,
      sowingWeight: this.sowingQuantity,
      seedMedium: this.seedMedium,
      soakDurationInHours: +this.soakDurationInHours!,
      weightUsed: this.weightUsed,
      germinationDurationInDays: null,
      blackOutDurationInDays: null,
      daysToHarvest: 10,
      harvestWeight: {
        amount: null,
        units: '' as Units
      },
      didStackTrays: true,
      dailyLightDurationInHours: 16,
      startDate: moment(this.startDate).format('MM/DD/YYYY HH:mm'),
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
