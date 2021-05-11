<template>
	<div>
		<v-row>
			<v-col cols="6">
				<v-card light>
					<v-card-title color="green">Grow Cycle Information</v-card-title>
					<v-row>
						<v-col cols="auto">
							<v-card>
							<v-card-text>
								<p><b>Seed Type:</b> {{growCycle.seedType}}</p>
								<p><b>Variety:</b> {{growCycle.variety}}</p>
								<p><b>Start Date/Time:</b> {{moment(growCycle.startDate).format('MM/DD/YYYY HH:mm')}}</p>
								<p><b>Soak time:</b> {{`${growCycle.soakDurationInHours} hour(s)`}}</p>
								<p><b>Germination time:</b> {{`${growCycle.germinationDurationInDays ? growCycle.germinationDurationInDays : '0'} day(s)`}}</p>
								<p><b>Blackout time:</b> {{`${growCycle.blackoutDurationInDays ? growCycle.blackoutDurationInDays : '0'} day(s)`}}</p>
							</v-card-text>
							</v-card>
						</v-col>
						<v-col cols="auto">
							<v-card>
							<v-card-text>
								<p><b>Weight Used:</b> {{growCycle.weightUsed}}</p>
								<!-- <p><b>Trays were stacked?:</b> {{`${entry.didStackTrays ? 'Yes' : 'No'}`}}</p> -->
								<p><b>Seed Medium:</b> {{growCycle.seedMedium}}</p>
								<p><b>Cycle duration:</b> {{`${growCycle.daysToHarvest ? growCycle.daysToHarvest : '0'} day(s)`}}</p>
								<p><b>Harvest Date/Time:</b> {{`${growCycle.harvestDate ? moment(growCycle.harvestDate).format('MM/DD/YYYY HH:mm'): ''}`}}</p>
								<p><b>Harvest Method:</b> {{growCycle.harvestMethod }}</p>
							</v-card-text>
							</v-card>
						</v-col>
						<v-col cols="auto">
							<v-card>
							<v-card-text>
								Seed Batch stuff goes here
							</v-card-text>
							</v-card>
						</v-col>
						<v-col cols="auto">
							<v-card>
							<v-card-text>
								Notes:
								<p v-for="(note, i) in growCycle.dailyGrowNotes" :key="i"><b>{{`${moment(note.dateTime).format('MM/DD/YYYY HH:mm')}`}}</b> - {{`${note.message}`}}</p>
							</v-card-text>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
			<v-col cols="6">
				<v-card light>
					<v-card-title color="green">Environmental Conditions</v-card-title>
					<v-row>
						<v-col cols="auto" v-for="(entry, i) in growCycle.dailyEnvironmentalConditions" :key="i">

							<v-card >
								<v-card-text>
									<p><b>Date/time:</b> {{entry.dateTime}}</p>
									<p><b>Temperature range:</b> {{`${entry.temperatureLow} - ${entry.temperatureHigh}${entry.temperatureUnit}`}}</p>
									<p><b>Humidity range:</b> {{`${entry.humidityLow} - ${entry.humidityHigh}%`}}</p>
									<p><b>Used a fan?:</b> {{`${entry.hadFan ? 'Yes' : 'No'}`}}</p>
									<p><b>Notes:</b> {{entry.notes}}</p>
								</v-card-text>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<v-card light>
					<v-card-title color="green">Watering Entries</v-card-title>
					<v-row>
						<v-col cols="auto" v-for="(entry, i) in growCycle.dailyWaterUsage" :key="i">

							<v-card >
								<v-card-text>
									<p><b>Date/time:</b> {{entry.dateTime}}</p>
									<p><b>Watering Method:</b> {{entry.wateringMethod}}</p>
									<p><b>Watering Amount:</b> {{`${entry.quantity} ${entry.units}`}}</p>
									<p><b>Used Nutrient Solution?:</b> {{`${entry.hadNutrients ? 'Yes' : 'No'}`}}</p>
									<p><b>Notes:</b> {{entry.notes}}</p>
								</v-card-text>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator';
import { GrowCycle } from '~/types/types';
import moment from 'moment';

@Component<GrowCycleDetails>({

})
export default class GrowCycleDetails extends Vue {
	@Prop({})
	growCycle!: GrowCycle;
	
	moment = moment
}
</script>