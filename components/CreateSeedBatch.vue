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
                  v-model="purchasedFrom"
                  :rules="rules"
                  label="Purchased From"
                  hide-details="auto"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="purchaseDate"
                  :rules="rules"
                  v-mask="'##/##/####'"
                  label="Purchase Date"
                  hide-details="auto"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="shippingTimeInDays"
                  :rules="rules"
                  label="Shipping Time (days)"
                  hide-details="auto"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="totalPrice"
                  :rules="rules"
                  label="Total Price"
                  hide-details="auto"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="quantity.amount"
                  label="Amount of seed"
                  :rules="rules"
                />
              </v-col>

              <v-col>
                <v-autocomplete
                  v-model="quantity.unit"
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
                  v-model="germinationPercent"
                  :rules="rules"
                  label="Germination percent"
                  hide-details="auto"
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="germinationTestDate"
                  :rules="rules"
                  v-mask="'##/##/####'"
                  label="Germination Test Date"
                  hide-details="auto"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-alert v-if="success" outlined type="success" text>
                  Your seed batch has been successfully created
                </v-alert>
                <v-alert v-if="success === false" outlined type="error" text>
                  There was an error creating your seed batch. Please try again
                  later.
                </v-alert>

                <v-btn
                  :disabled="success"
                  @click="submitForm"
                  color="yellow"
                  class="black--text"
                >
                  <v-icon>{{ mdiSeed }}</v-icon>
                  &nbsp; Click to create
                </v-btn>
                <v-btn v-if="success" @click="handleReset" color="blue">
                  <v-icon>{{ mdiPlusThick }}</v-icon>
                  &nbsp; Add another seed batch
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
  Quantity,
  Units
} from '~/types/types'
// const seedTypes = require('../assets/seedTypes.json')
import seedTypes from '~/assets/seedTypes'
import varieties from '~/assets/varieties'
import seedMediums from '~/assets/seedMediums'
import harvestMethods from '~/assets/harvestMethods'
import units from '~/assets/units'
import moment from 'moment'
import { mdiPlusThick, mdiSproutOutline, mdiSendCheck, mdiSeed } from '@mdi/js'

// const SettingStore = namespace(settingStoreNamespace)

@Component({})
export default class CreateSeedBatch extends Vue {
  public success: boolean | null = null

  public mdiPlusThick = mdiPlusThick
  public mdiSproutOutline = mdiSproutOutline
  public mdiSendCheck = mdiSendCheck
  public mdiSeed = mdiSeed
  public seedTypes = seedTypes
  public varieties = varieties
  public seedMediums = seedMediums
  public harvestMethods = harvestMethods
  public units = units

  public seedBatches = [] as GrowCycle[]

  public purchasedFrom = ''
  public brand = ''
  public seedType = ''
  public variety = ''
  public purchaseDate = ''
  public shippingTimeInDays = null
  public quantity = {
    amount: null,
    unit: '' as Units
  } as Quantity
  public totalPrice = null
  public pricePerPound = null
  public germinationTestDate = null
  public germinationPercent = null

  rules = [(v: any) => !!v || 'Required']

  public get seedVarieties () {
    return this.seedType
      ? this.varieties[this.seedType as keyof typeof varieties]
      : [{ name: 'Please Choose a seed type' }]
  }

  async createNewSeedBatch () {
    const newSeedBatch: SeedBatch = {
      purchasedFrom: this.purchasedFrom,
      brand: this.brand,
      seedType: this.seedType as SeedTypes,
      variety: this.variety as Varieties,
      purchaseDate: this.purchaseDate,
      shippingTimeInDays: this.shippingTimeInDays,
      quantity: this.quantity,
      totalPrice: this.totalPrice,
      pricePerPound: this.quantity.amount! / this.totalPrice!,
      germinationTestDate: this.germinationTestDate,
      germinationPercent: this.germinationPercent
    }
    await axios
      .post('/api/createNewSeedBatch', newSeedBatch)
      .then(result => {
        this.seedBatches = [...this.seedBatches, result.data]
      })
      .catch(error =>
        console.log('error from createNewSeedBatch front end', error)
      )
  }

  public handleReset () {
    this.success = null
    ;(this.$refs.form as any).reset()
  }

  public async submitForm () {
    if ((this.$refs.form as any).validate()) {
      await this.createNewSeedBatch()
      this.success = true
    }
  }
}
</script>
