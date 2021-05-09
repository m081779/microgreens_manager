<template>
  <main>
    <v-row>
        <v-dialog
          v-model="growCycleModal"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar dark color="green">
              <v-toolbar-title>Create new grow cycle</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon dark @click="closeGrowCycleModal">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <CreateGrowCycle />
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="environmentalConditionModal"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar dark color="red" >
              <v-toolbar-title >Create new daily environmental condition entry</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon dark @click="closeEnvironmentalConditionModal" >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <CreateEnvironmentalConditionsEntry :growCycles="growCycles"/>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="seedBatchModal"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar dark color="yellow">
              <v-toolbar-title class="black--text" >Create new seed batch</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon dark class="black--text" @click="closeSeedBatchModal" >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <CreateSeedBatch />
          </v-card>
        </v-dialog>
    </v-row>
    <v-row>
      <v-col >
        <v-btn color="green" @click="growCycleModal = true">
          <v-icon>{{ mdiSproutOutline }}</v-icon>
          &nbsp; New Grow Cycle
        </v-btn>
        <v-btn color="yellow" class="black--text" @click="seedBatchModal = true">
          <v-icon>{{ mdiSeed }}</v-icon>
          &nbsp; New Seed Batch
        </v-btn>
        <v-btn color="red" @click="environmentalConditionModal = true">
          <v-icon>{{ mdiThermometerPlus }}</v-icon>
          &nbsp; New Daily Environment Entry
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(growCycle, i) in growCycles" :key="i" cols="12" md="6" lg="4" xl="3">
        <GrowCycleCard v-if="!growCycle.completed" :growCycle="growCycle" />
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
import CreateEnvironmentalConditionsEntry from '~/components/CreateEnvironmentalConditionsEntry.vue'
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
    CreateSeedBatch,
    CreateEnvironmentalConditionsEntry,
  }
})
export default class Index extends Vue {
  // Icons from https://materialdesignicons.com/

  public mdiPlusThick = mdiPlusThick
  public mdiSproutOutline = mdiSproutOutline
  public mdiSeed = mdiSeed
  public mdiWateringCanOutline = mdiWateringCanOutline
  public mdiThermometerPlus = mdiThermometerPlus
  public growCycleModal = false
  public seedBatchModal = false
  public environmentalConditionModal = false

  public get growCycles () {
    return this.$store.state.growCycle.growCycles
  }
  public set growCycles (growCycles: GrowCycle[]) {
    this.$store.commit('growCycle/addGrowCycles', growCycles)
  }
  public get seedBatches () {
    return this.$store.state.seedBatch.seedBatches
  }
  public set seedBatches (seedBatches: SeedBatch[]) {
    this.$store.commit('seedBatch/addSeedBatches', seedBatches)
  }

  async created () {
    await Promise.all([this.getGrowCycles(), this.getSeedBatches()])
  }

  public async closeGrowCycleModal() {
    await this.getGrowCycles();
    this.growCycleModal = false;

  }

  public async closeSeedBatchModal() {
    await this.getSeedBatches();
    this.seedBatchModal = false;

  }

  public async closeEnvironmentalConditionModal() {
    await this.getSeedBatches();
    this.environmentalConditionModal = false;

  }

  async getGrowCycles (this: Index) {
    if (this.growCycles.length === 0) {
      await axios
        .get('/api/getAllGrowCycles')
        .then(result => {
          this.growCycles = (result.data as GrowCycle[]).map(cycle => ({
            ...cycle,
            startDate: moment(cycle.startDate).format('MM/DD/YYYY HH:mm')
          }))
        })
        .catch(error => console.log('error from getGrowCycles'))
    }
  }

  async getSeedBatches (this: Index) {
    if (this.growCycles.length === 0) {
      await axios
        .get('/api/getAllSeedBatches')
        .then(async result => {
          this.seedBatches = result.data as SeedBatch[]
        })
        .catch(error => console.log('error from getSeedBatches'))
    }
  }
}
</script>
