<template>
	<div>
	<v-row justify="center">
		<v-col cols="10">
		<v-card class="pa-6">
			<v-form ref="form" class="mx-2" lazy-validation>
			<v-row>
				<v-col>
					<v-autocomplete
						v-model="wateringMethod"
						:rules="rules"
						:items="waterMethods"
						item-text="name"
						item-value="value"
						label="Watering method"
					/>
				</v-col>
				<v-col>
					<v-text-field
						v-model="dateTime"
						:rules="rules"
						v-mask="'##/##/#### ##:##'"
						label="Time of watering"
						hide-details="auto"
					/>
				</v-col>
			</v-row>

			<v-row>
				<v-col>
				<v-text-field
					v-model="quantity"
					:rules="rules"
					label="Quantity of water"
					hide-details="auto"
				/>
				</v-col>
				<v-col>
					<v-autocomplete
						v-model="units"
						:rules="rules"
						:items="waterUnits"
						item-text="name"
						item-value="value"
						label="Unit"
					/>
				</v-col>
				<v-col>
					<v-checkbox
						v-model="hadNutrients"
						label="Used nutrient solution?"
					/>
				</v-col>
			</v-row>


			<v-row>
				<v-col>
				<v-text-field
					v-model="note"
					label="note"
				/>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
				<v-alert v-if="success" outlined type="success" text>
					Your watering entry has been successfully created
				</v-alert>
				<v-alert v-if="success === false" outlined type="error" text>
					There was an error creating your watering entry. Please try again
					later.
				</v-alert>

				<v-btn :disabled="success" @click="submitForm" color="blue">
					<v-icon>{{ mdiWateringCanOutline }}</v-icon>
					&nbsp; click to create
				</v-btn>
				<v-btn v-if="success" @click="handleReset" color="blue">
					<v-icon>{{ mdiPlusThick }}</v-icon>
					&nbsp; Add another watering entry
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
  Quantity,
  WaterMethod,
  DailyWaterUsage
} from '~/types/types'
// const seedTypes = require('../assets/seedTypes.json')
import seedTypes from '~/assets/seedTypes'
import varieties from '~/assets/varieties'
import seedMediums from '~/assets/seedMediums'
import harvestMethods from '~/assets/harvestMethods'
import waterMethods from '~/assets/waterMethods'
import units from '~/assets/units'
import moment from 'moment'
import { mdiPlusThick, mdiWateringCanOutline } from '@mdi/js'

// const SettingStore = namespace(settingStoreNamespace)

@Component({})
export default class CreateWaterEntry extends Vue {
	@Prop({})
	public growCycle!: GrowCycle;
	 
	public success: boolean | null = null;

	public mdiWateringCanOutline = mdiWateringCanOutline;
	public mdiPlusThick = mdiPlusThick;

	public waterMethods = waterMethods;
	public waterUnits = units;

	public growCycles = [] as GrowCycle[];

	public wateringMethod = '' as WaterMethod;
	public dateTime = moment().format('MM/DD/YYYY HH:mm');
	public quantity = null;
	public units = '' as Units;
	public hadNutrients = true;
	public note = '';
	public dailyWaterUsageId = ''


	rules = [(v: any) => !!v || 'Required']

	async createDailyWaterUsage () {
	const newWaterMethod: DailyWaterUsage = {
		wateringMethod: this.wateringMethod,
		dateTime: this.dateTime as unknown as string,
		quantity: this.quantity,
		units: this.units,
		hadNutrients: this.hadNutrients,
		notes: this.note,
	}
	await axios
		.post('/api/createNewDailyWaterUsage', newWaterMethod)
		.then(async (result) => {
			this.dailyWaterUsageId = result.data._id;
			await this.updateOneGrowCycle()
		})
		.catch(error =>
		console.log('error from createDailyWaterUsage front end', error)
		)
	}

	public async updateOneGrowCycle() {
		const payload = { id: this.growCycle._id, data: {dailyWaterUsage: [...this.growCycle.dailyWaterUsage, this.dailyWaterUsageId]}}
		await axios
			.put('/api/updateOneGrowCycle', payload)
			.then(result => {
			}).catch(error => console.log('error from updateOneGrowCycle front end', error))

	}

	public handleReset () {
	this.success = null
	;(this.$refs.form as any).reset()
	}

	public async submitForm () {
	if ((this.$refs.form as any).validate()) {
		await this.createDailyWaterUsage()
		this.success = true
	}
	}
}
</script>
