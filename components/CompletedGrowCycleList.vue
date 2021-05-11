<template>
<div>
	<v-divider/>
	<h3 class="ma-4" style="text-decoration: underline;">Completed Grow Cycles:</h3>
	<v-autocomplete v-model="filterField" :items="searchFields" item-text="text" item-value="value" label="Filter by..." class="ma-4" />
	<v-text-field v-if="filterField" v-model="filterText" label="Search for..." class="ma-4" />
	
	<v-list>
		<v-list-group
			:value="false"
			v-for="(growCycle, i) in filteredGrowCycles" :key="i"
		>
			<template v-slot:activator>
			<v-list-item-title class="white--text">{{`${growCycle.seedType}: ${growCycle.variety} - ${growCycle.startDate}`}}</v-list-item-title>
			</template>
			<v-list-item-content class="white--text pa-6">
				<h4 class="text--primary">Start Date: {{ growCycle.startDate }}</h4>
				<h4 class="text--primary">Sowing weight: {{ growCycle.sowingWeight.amount }} {{ growCycle.sowingWeight.units }}</h4>
				<h4 class="text--primary">Germination days: {{ growCycle.germinationDurationInDays }}</h4>
				<h4 class="text--primary">Blackout days: {{ growCycle.blackOutDurationInDays }}</h4>
				<h4 class="text--primary">Duration: {{ growCycle.seedType }}</h4>
				<h4 class="text--primary">
					Number of trays: {{ growCycle.numberOfTrays }}
				</h4>
				<h4 class="text--primary">
					Soak time: {{ growCycle.soakDurationInHours }} hours
				</h4>
				<h4 class="text--primary">Growing medium: {{ growCycle.seedMedium }}</h4>
				<h4 class="text--primary">Duration: {{ growCycle.daysToHarvest }}</h4>
				<h4 class="text--primary">Harvest date: {{ growCycle.harvestDate }}</h4>
				<h4 class="text--primary">Harvest weight: {{ growCycle.harvestWeight.amount }} {{ growCycle.harvestWeight.units }}</h4>
			</v-list-item-content>
<!-- 		
			<v-list-group
			:value="true"
			no-action
			sub-group
			>
			<template v-slot:activator>
				<v-list-item-content>
				<v-list-item-title>Admin</v-list-item-title>
				</v-list-item-content>
			</template> -->


		</v-list-group>
	</v-list>
	</div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator';
import { GrowCycle } from '~/types/types';

@Component<CompletedGrowCycleList>({})
export default class CompletedGrowCycleList extends Vue{
	@Prop({})
	completedGrowCycles!: GrowCycle[];

	public filterField = ''
	public filterText = ''

	public get searchFields() {
		return [
			{ text: 'some text', value: 'poop'},
			{ text: 'Number of trays', value: 'numberOfTrays'}
		]
	}

	public get filteredGrowCycles() {
		if (this.filterText) {
			return this.completedGrowCycles.filter((growCycle: GrowCycle) => growCycle[this.filterField as keyof GrowCycle] == this.filterText)
		}
		return this.completedGrowCycles;
	}

	created() {
		console.log('asdfasdfasdfasdf', this.completedGrowCycles)
	}
}
</script>