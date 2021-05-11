<template>
	<div>
		<v-navigation-drawer
			app
			fixed
			permanent
			src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
			width="350"
			
		>
			<v-list>
				<v-list-item>
					<v-list-item-content>
						<v-btn color="green" @click="growCycleModal = true">
							<v-icon>{{ mdiSproutOutline }}</v-icon>
							&nbsp; New Grow Cycle
						</v-btn>
					</v-list-item-content>
				</v-list-item>

				<v-list-item>
					<v-list-item-content>
						<v-btn color="yellow" class="black--text" @click="seedBatchModal = true">
							<v-icon>{{ mdiSeed }}</v-icon>
							&nbsp; New Seed Batch
						</v-btn>
					</v-list-item-content>
				</v-list-item>

				<v-list-item>
					<v-list-item-content>
						<v-btn color="red" @click="environmentalConditionModal = true">
							<v-icon>{{ mdiThermometerPlus }}</v-icon>
							&nbsp; New Env Entry
						</v-btn>
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<div>
				<CompletedGrowCycleList :completedGrowCycles="completedGrowCycles" />
			</div>
		</v-navigation-drawer>
		<v-row>
			<v-dialog
				v-model="detailViewModal"
				fullscreen
				hide-overlay
				transition="dialog-bottom-transition"
			>
				<v-card>
				<v-toolbar dark color="green">
					<v-toolbar-title>View Grow Cycle Details</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon dark @click="detailViewModal = false">
					<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-toolbar>
				<GrowCycleDetails :growCycle="selectedGrowCycle"/>
				</v-card>
			</v-dialog>
			<v-dialog
				v-model="growCycleModal"
				width="900"
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
				width="900"
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
				width="900"
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
		<v-row class="card_row">
			<div v-for="(growCycle, i) in growCycles" :key="i">
				<v-col v-if="!growCycle.completed" cols="auto" >
					<GrowCycleCard  :growCycle="growCycle" :selectGrowCycle="selectGrowCycle" />
				</v-col>
			</div>
		</v-row>
	</div>
</template>

<style lang="scss" scoped>
.card_row {
	margin-left: 340px;
}
</style>

<script lang="ts">
import { Component, Vue, namespace, State } from 'nuxt-property-decorator'
import axios from 'axios'
import { GrowCycle, SeedBatch } from '~/types/types'
import CreateGrowCycle from '~/components/CreateGrowCycle.vue'
import CreateSeedBatch from '~/components/CreateSeedBatch.vue'
import CreateEnvironmentalConditionsEntry from '~/components/CreateEnvironmentalConditionsEntry.vue'
import GrowCycleDetails from '~/components/GrowCycleDetails.vue'
import GrowCycleCard from '~/components/GrowCycleCard.vue'
import CompletedGrowCycleList from '~/components/CompletedGrowCycleList.vue'
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
		GrowCycleDetails,
		CompletedGrowCycleList,
	}
})
export default class Index extends Vue {
  	// Icons from https://materialdesignicons.com/

	public mdiPlusThick = mdiPlusThick;
	public mdiSproutOutline = mdiSproutOutline;
	public mdiSeed = mdiSeed;
	public mdiWateringCanOutline = mdiWateringCanOutline;
	public mdiThermometerPlus = mdiThermometerPlus;
	public growCycleModal = false;
	public seedBatchModal = false
	public environmentalConditionModal = false;
	public detailViewModal = false;
	public selectedGrowCycle = {} as GrowCycle

	public get completedGrowCycles() {
		return this.$store.state.growCycle.growCycles.filter((growCycle: GrowCycle) => growCycle.completed)
	}

	public get growCycles () {
		return this.$store.state.growCycle.growCycles;
	}
	public set growCycles (growCycles: GrowCycle[]) {
		this.$store.commit('growCycle/addGrowCycles', growCycles);
	}
	public get seedBatches () {
		return this.$store.state.seedBatch.seedBatches;
	}
	public set seedBatches (seedBatches: SeedBatch[]) {
		this.$store.commit('seedBatch/addSeedBatches', seedBatches);
	}

	async created () {
		await Promise.all([this.getGrowCycles(), this.getSeedBatches()]);
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

	public selectGrowCycle(growCycle: GrowCycle) {
		this.selectedGrowCycle = growCycle;
		this.detailViewModal = true;
	}

	async getGrowCycles (this: Index) {
		if (this.growCycles.length === 0) {
			await axios
			.get('/api/getAllGrowCycles')
			.then(result => {
				this.growCycles = (result.data as GrowCycle[]).map(cycle => ({
				...cycle,
				startDate: moment(cycle.startDate).format('MM/DD/YYYY HH:mm')
				}));
			})
			.catch(error => console.log('error from getGrowCycles'));
		}
	}

	async getSeedBatches (this: Index) {
		if (this.growCycles.length === 0) {
			await axios
			.get('/api/getAllSeedBatches')
			.then(async result => {
				this.seedBatches = result.data as SeedBatch[]
			})
			.catch(error => console.log('error from getSeedBatches'));
		}
	}
}
</script>
