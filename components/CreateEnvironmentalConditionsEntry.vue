<template>
	<div>
	<v-row justify="center">
		<v-col cols="10">
		<v-card class="pa-6">
			<v-form ref="form" class="mx-2" lazy-validation>
			<v-row>
				<v-col>
					<v-text-field
						v-model="temperatureLow"
						:rules="rules"
						label="Temperature Low"
						hide-details="auto"
					/>
				</v-col>
				<v-col>
					<v-text-field
						v-model="temperatureHigh"
						:rules="rules"
						label="Temperature High"
						hide-details="auto"
					/>
				</v-col>
				<v-col>
					<v-autocomplete
						v-model="temperatureUnit"
						:rules="rules"
						:items="temperatureUnits"
						item-text="text"
						item-value="value"
						label="Temperature Unit"
					/>
				</v-col>
			</v-row>

			<v-row>
				<v-col>
					<v-text-field
						v-model="humidityLow"
						:rules="rules"
						label="Humidity Low"
						hide-details="auto"
					/>
				</v-col>
				<v-col>
					<v-text-field
						v-model="humidityHigh"
						:rules="rules"
						label="Humidity High"
						hide-details="auto"
					/>
				</v-col>
				<v-col>
					<v-checkbox
						v-model="hadFan"
						:rules="rules"
						label="Used a fan?"
					/>
				</v-col>
			</v-row>


			<v-row>
				<v-col>
				<v-text-field
					v-model="notes"
					label="Notes"
				/>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
				<v-alert v-if="success" outlined type="success" text>
					Your environment entry has been successfully created
				</v-alert>
				<v-alert v-if="success === false" outlined type="error" text>
					There was an error creating your environment entry. Please try again
					later.
				</v-alert>

				<v-btn :disabled="success" @click="submitForm" color="red">
					<v-icon>{{ mdiThermometerPlus }}</v-icon>
					&nbsp; click to create
				</v-btn>
				<v-btn v-if="success" @click="handleReset" color="blue">
					<v-icon>{{ mdiPlusThick }}</v-icon>
					&nbsp; Add another environment entry
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
	DailyEnvironmentalConditions,
  GrowCycle,
} from '~/types/types'
import moment from 'moment'
import { mdiPlusThick, mdiThermometerPlus } from '@mdi/js'

// const SettingStore = namespace(settingStoreNamespace)

@Component<CreateEnvironmentalConditionsEntry>({})
export default class CreateEnvironmentalConditionsEntry extends Vue {
	@Prop({})
	public growCycles!: GrowCycle[];
	
	public success: boolean | null = null;

	public mdiThermometerPlus = mdiThermometerPlus;
	public mdiPlusThick = mdiPlusThick;

	public temperatureUnits = [
		{ text: 'Fahrenheit', value: 'f' },
		{ text: 'Celsius', value: 'c' },
	];

	public temperatureUnit: 'f' | 'c' = 'f';
	public temperatureLow = null;
	public temperatureHigh = null;
	public humidityLow = null;
	public humidityHigh = null;
	public dateTime = moment().format('MM/DD/YYYY HH:mm');
	public hadFan = true;
	public notes = '';

	public dailyEnvironmentalEntryId = '';


	rules = [(v: any) => !!v || 'Required'];

	public get growCycleIds() {
		return this.growCycles.filter(growCycle => !growCycle.completed).map(growCycle => growCycle._id)
	}

	async createDailyEnvironmentalConditions () {
		const newEnvironmentalConditions: DailyEnvironmentalConditions = {
			temperatureUnit: this.temperatureUnit,
			temperatureLow: this.temperatureLow,
			temperatureHigh: this.temperatureHigh,
			humidityLow: this.humidityLow,
			humidityHigh: this.humidityHigh,
			dateTime: moment(this.dateTime).format('MM/DD/YYYY HH:mm'),
			hadFan: this.hadFan,
			notes: this.notes,
		}
		await axios
			.post('/api/createNewDailyEnvironmentalConditions', newEnvironmentalConditions)
			.then(async (result) => {
				this.dailyEnvironmentalEntryId = result.data._id;
				await this.updateAllGrowCycles()
			})
			.catch(error =>
			console.log('error from createDailyEnvironmentalConditions front end', error)
			)
	}

	public async updateAllGrowCycles() {
		const payload = { idArray: [ ...this.growCycleIds ], payload: {dailyEnvironmentalConditions: [...this.growCycles[0].dailyEnvironmentalConditions, this.dailyEnvironmentalEntryId]}};
		await axios
			.put('/api/updateAllGrowCycles', payload)
			.then(result => {
			}).catch(error => console.log('error from updateAllGrowCycles front end', error))

	}

	public handleReset () {
	this.success = null
	;(this.$refs.form as any).reset()
	}

	public async submitForm () {
	if ((this.$refs.form as any).validate()) {
		await this.createDailyEnvironmentalConditions()
		this.success = true
	}
	}
}
</script>
