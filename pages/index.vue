<template>
  <main>
    <v-row>
      <v-col cols="3">
        <v-dialog
          v-model="growCycleModal"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="green" v-bind="attrs" v-on="on">
              <v-icon>{{ mdiSproutOutline }}</v-icon>
              &nbsp; New Grow Cycle
            </v-btn>
          </template>
          <v-card>
            <v-toolbar dark color="green">
              <v-btn icon dark @click="growCycleModal = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Create new grow cycle</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <CreateGrowCycle />
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="3">
        <v-dialog
          v-model="seedBatchModal"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="yellow" class="black--text" v-bind="attrs" v-on="on">
              <v-icon>{{ mdiSeed }}</v-icon>
              &nbsp; New Seed Batch
            </v-btn>
          </template>
          <v-card>
            <v-toolbar dark color="yellow">
              <v-btn
                icon
                dark
                @click="seedBatchModal = false"
                class="black--text"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title class="black--text"
                >Create new seed batch</v-toolbar-title
              >
              <v-spacer></v-spacer>
            </v-toolbar>
            <CreateSeedBatch />
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="3">
        <v-btn color="blue">
          <v-icon>{{ mdiWateringCanOutline }}</v-icon>
          &nbsp; New Watering Entry
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn color="red">
          <v-icon>{{ mdiThermometerPlus }}</v-icon>
          &nbsp; New Temperature/humidity
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="(growCycle, i) in growCycles" :key="i" cols="3">
        <GrowCycleCard v-if="!growCycle.complete" :growCycle="growCycle" />
      </v-col>
    </v-row>
  </main>
</template>

<script lang="ts">
import { Component, Vue, namespace, State } from 'nuxt-property-decorator'
import axios from 'axios'
import { GrowCycle, SeedBatch } from '~/types/types'
import CreateGrowCycle from '~/components/CreateGrowCycle.vue'
import CreateSeedBatch from '~/components/CreateSeedBatch.vue'
import GrowCycleCard from '~/components/GrowCycleCard.vue'
import {
  mdiPlusThick,
  mdiSproutOutline,
  mdiSeed,
  mdiWateringCanOutline,
  mdiThermometerPlus
} from '@mdi/js'
import moment from 'moment'

@Component({
  components: {
    CreateGrowCycle,
    GrowCycleCard,
    CreateSeedBatch
  }
})
export default class Index extends Vue {
  // Icons from https://materialdesignicons.com/

  public mdiPlusThick = mdiPlusThick
  public mdiSproutOutline = mdiSproutOutline
  public mdiSeed = mdiSeed
  public mdiWateringCanOutline = mdiWateringCanOutline
  public mdiThermometerPlus = mdiThermometerPlus

  public get growCycles () {
    return this.$store.state.growCycle.growCycles
  }
  public set growCycles (growCycles: GrowCycle[]) {
    this.$store.commit('growCycle/add', growCycles)
  }
  public seedBatches = [] as SeedBatch[]
  public growCycleModal = false
  public seedBatchModal = false

  async created () {
    await Promise.all([this.getGrowCycles(), this.getSeedBatches()])
  }

  async getGrowCycles (this: Index) {
    await axios
      .get('/api/getAllGrowCycles')
      .then(result => {
        this.growCycles = (result.data as GrowCycle[]).map(cycle => ({
          ...cycle,
          startDate: moment(cycle.startDate).format('MM/DD/YYYY HH:mm')
        }))
      })
      .catch(error => console.log('error'))
  }

  async getSeedBatches (this: Index) {
    await axios
      .get('/api/getAllSeedBatches')
      .then(result => {
        this.seedBatches = result.data as SeedBatch[]
      })
      .catch(error => console.log('error'))
  }
}
</script>
