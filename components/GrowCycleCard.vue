<template>
  <v-card class="mx-auto" max-width="344" color="green">
    <v-card-text>
      <h2 class="black--text">
        {{ `${growCycle.seedType} - ${growCycle.variety}` }}
      </h2>
      <h3 class="text--primary">Start Date: {{ growCycle.startDate }}</h3>
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
            <v-btn icon dark @click="viewEditModal = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>View / edit grow cycle</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <ViewEditGrowCycle :mode="mode" :growCycle="growCycle" />
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<style lang="sass" scoped></style>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { GrowCycle } from '~/types/types'
import { mdiPencil, mdiEye } from '@mdi/js'
import ViewEditGrowCycle from '~/components/ViewEditGrowCycle.vue'

@Component({
  components: {
    ViewEditGrowCycle
  }
})
export default class GrowCycleCard extends Vue {
  public mdiPencil = mdiPencil
  public mdiEye = mdiEye

  @Prop({})
  public growCycle!: GrowCycle

  public viewEditModal = false
  public mode = ''

  public setMode (mode: 'view' | 'edit') {
    this.mode = mode
  }
}
</script>
