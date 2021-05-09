<template>
  <v-card class="" max-width="1000" color="green">
    <v-card-text>
      <h2 class="black--text">
        {{ `${growCycle.seedType} - ${growCycle.variety}` }}
      </h2>
      <h3 class="text--primary">Start Date: {{ growCycle.startDate }}</h3>
      <h3 class="text--primary">Duration: {{ growCycleDuration }}</h3>
      <h3 class="text--primary">
        Number of trays: {{ growCycle.numberOfTrays }}
      </h3>
      <h3 class="text--primary">
        Soak time: {{ growCycle.soakDurationInHours }} hours
      </h3>
      <h3 class="text--primary">Growing medium: {{ growCycle.seedMedium }}</h3>
    </v-card-text>
    <v-card-actions>
      <v-dialog
        v-model="viewEditModal"
        transition="dialog-bottom-transition"
        width="900"
      >
        <template v-slot:activator="{ on, attrs }">
          
          <v-btn
            @click="setMode('view')"
            color="purple"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>{{ mdiEye }}</v-icon>
            &nbsp; View
          </v-btn>

          <v-btn
            @click="setMode('edit')"
            color="orange"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>{{ mdiPencil }}</v-icon>
            &nbsp; Edit
          </v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="green">
            <v-toolbar-title>View / edit grow cycle</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="viewEditModal = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <ViewEditGrowCycle :mode="mode" :growCycle="growCycle" />
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="wateringEntryModal"
        hide-overlay
        width="900"
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on, attrs }">
        <v-btn 
            color="blue"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>{{ mdiWateringCanOutline }}</v-icon>
            &nbsp; Water Entry
          </v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="blue">
            <v-toolbar-title>New water entry</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="wateringEntryModal = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <CreateWaterEntry :growCycle="growCycle" />
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<style lang="sass" scoped></style>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { GrowCycle } from '~/types/types'
import { mdiPencil, mdiEye, mdiWateringCanOutline,
  mdiThermometerPlus } from '@mdi/js'
import ViewEditGrowCycle from '~/components/ViewEditGrowCycle.vue'
import CreateWaterEntry from '~/components/CreateWaterEntry.vue'
import convertMiliseconds from '~/helpers/convertMilliseconds'
@Component({
  components: {
    ViewEditGrowCycle,
    CreateWaterEntry,
  }
})
export default class GrowCycleCard extends Vue {
  public mdiPencil = mdiPencil
  public mdiEye = mdiEye
  public mdiWateringCanOutline = mdiWateringCanOutline
  public mdiThermometerPlus = mdiThermometerPlus

  @Prop({})
  public growCycle!: GrowCycle

  public viewEditModal = false
  public wateringEntryModal = false
  public mode = ''

  public get growCycleDuration () {
    const startDate: any = new Date(this.growCycle.startDate as string)
    const today: any = new Date(Date.now())
    const difference = today - startDate
    const { d, h, m } = convertMiliseconds(difference)

    return `${d}d:${h}h:${m}m`
  }

  public setMode (mode: 'view' | 'edit') {
    this.mode = mode
  }
}
</script>
