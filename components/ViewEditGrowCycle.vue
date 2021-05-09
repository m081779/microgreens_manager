<template>
	<div>
		<v-row justify="center">
			<v-col cols="10">
				<v-card class="pa-6">
					<v-form
						ref="form"
						class="mx-2"
						lazy-validation
					>
						<v-row>
							<v-col>
								<v-autocomplete
									v-model="seedType"
									:readonly="mode === 'view'"
									:items="seedTypes"
									item-text="name"
									item-value="value"
									label="Seed Types"
								/>
							</v-col>
							<v-col>
								<v-autocomplete
									v-model="variety"
									:readonly="mode === 'view'"
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
									v-model="startDate"
									:readonly="mode === 'view'"
									v-mask="'##/##/#### ##:##'"
									label="Start Date"
									hide-details="auto"
								/>
							</v-col>
							<v-col>
								<v-text-field
									v-model="numberOfTrays"
									:readonly="mode === 'view'"
									label="Number of trays"
									hide-details="auto"
								/>
							</v-col>
						</v-row>

						<v-row>
							<v-col>
								<v-text-field
								v-model="sowingWeight.amount"
								:readonly="mode === 'view'"
								label="Sowing Weight"
								hide-details="auto"
								/>
							</v-col>
							<v-col>
								<v-autocomplete
								v-model="sowingWeight.units"
								:readonly="mode === 'view'"
								:items="units"
								item-text="name"
								item-value="value"
								label="Unit"
								/>
							</v-col>
							<v-col>
								<v-autocomplete
									v-model="seedMedium"
									:readonly="mode === 'view'"
									:items="seedMediums"
									item-text="name"
									item-value="value"
									label="Seed Medium"
								/>
							</v-col>
						</v-row>

						<v-row>
							<v-col>
								<v-text-field
									v-model="soakDurationInHours"
									:readonly="mode === 'view'"
									label="Soak duration (hours)"
									hide-details="auto"
								/>
							</v-col>
							<v-col>
								<v-text-field
									v-model="weightUsed"
									:readonly="mode === 'view'"
									label="Weight used"
									hide-details="auto"
								/>
							</v-col>
							<v-col>
								<v-checkbox
									v-model="didStackTrays"
									:readonly="mode === 'view'"
									label="Stacked trays?"
								/>
							</v-col>
						</v-row>

						<v-row>
							<v-col>
								<v-text-field
									v-model="germinationDurationInDays"
									:readonly="mode === 'view'"
									label="Germination duration (days)"
									hide-details="auto"
								/>
							</v-col>
							<v-col>
								<v-text-field
									v-model="blackOutDurationInDays"
									:readonly="mode === 'view'"
									label="Blackout duration (days)"
									hide-details="auto"
								/>
							</v-col>
						</v-row>

						<v-row>
							<v-col>
								<v-text-field
									v-model="daysToHarvest"
									:readonly="mode === 'view'"
									label="Days to harvest"
									hide-details="auto"
								/>
							</v-col>
							<v-col>
								<v-text-field
									v-model="harvestWeight.amount"
									:readonly="mode === 'view'"
									label="Harvest weight"
									hide-details="auto"
								/>
							</v-col>
							<v-col>
								<v-autocomplete
								v-model="harvestWeight.units"
								:readonly="mode === 'view'"
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
									v-model="harvestDate"
									:readonly="mode === 'view'"
									v-mask="'##/##/####'"
									label="Harvest Date"
									hide-details="auto"
								/>
							</v-col>
							<v-col>
								<v-autocomplete
									v-model="harvestMethod"
									:readonly="mode === 'view'"
									:items="harvestMethods"
									item-text="name"
									item-value="value"
									label="Harvest Methods"
								/>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-text-field
									v-model="dailyLightDurationInHours"
									:readonly="mode === 'view'"
									label="Number of hours of light/day"
									hide-details="auto"
								/>
							</v-col>
							<v-col>
								<v-text-field
									v-model="percentageIncreaseOverSeedWeight"
									:readonly="mode === 'view'"
									label="% Weight gain over seed weight"
									hide-details="auto"
								/>
							</v-col>
						</v-row>

						<v-row>
							<v-col>
								<v-text-field
									v-model="seedBatch"
									:readonly="mode === 'view'"
									label="Seed Batch"
									hide-details="auto"
								/>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<ul>
									<li v-for="(note, i) in dailyGrowNotes" :key="i">{{note}}</li>
								</ul>
								<v-textarea
									v-model="dailyGrowNote"
									:readonly="mode === 'view'"
									label="Add a note"
								/>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-checkbox
									v-model="completed"
									:readonly="mode === 'view'"
									label="Complete this grow cycle?"
								/>
							</v-col>
						</v-row>
						<v-alert
							v-if="success"
							outlined
							type="success"
							text
						>
							Your grow cycle has been successfully updated
						</v-alert>
						<v-alert
							v-if="success === false"
							outlined
							type="error"
							text
						>
							There was an error creating your grow cycle. Please try again
							later.
						</v-alert>

						<v-btn
							v-if="mode && mode === 'edit'"
							:disabled="success"
							@click="verifyCompleted"
							color="green"
						>
							<v-icon>{{ mdiSendCheck }}</v-icon>
							&nbsp; Submit
						</v-btn>
						<v-btn
							v-if="!mode"
							@click="submitForm"
							color="green"
						>
							<v-icon>{{ mdiSproutOutline }}</v-icon>
							&nbsp; Click to update
						</v-btn>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<style lang="scss" scoped>
.v-dialog {
	overflow-y: hidden !important;
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import axios from "axios";
import { DailyGrowNotes, GrowCycle, Quantity } from "~/types/types";
import seedTypes from "~/assets/seedTypes";
import varieties from "~/assets/varieties";
import seedMediums from "~/assets/seedMediums";
import harvestMethods from "~/assets/harvestMethods";
import units from "~/assets/units";
import moment from "moment";
import { mdiPlusThick, mdiSproutOutline, mdiSendCheck } from "@mdi/js";

@Component({})
export default class ViewEditGrowCycle extends Vue {
	@Prop({})
	growCycle!: GrowCycle;

	@Prop({ default: "" })
	mode!: "view" | "edit";


	public mdiPlusThick = mdiPlusThick;
	public mdiSproutOutline = mdiSproutOutline;
	public mdiSendCheck = mdiSendCheck;

	public seedTypes = seedTypes;
	public varieties = varieties;
	public seedMediums = seedMediums;
	public harvestMethods = harvestMethods;
	public units = units;

	public growCycles = [] as GrowCycle[];
	public success: boolean | null = null;


	public get seedBatch() {
		const { brand, seedType, variety, purchaseDate } = this.growCycle && this.growCycle.seedBatch;
		return `${brand} (${seedType} - ${variety}) ${moment( purchaseDate ).format('MM/DD/YYYY')}`;
	}
	public set seedBatch(seedBatch: string) {
		const { brand, seedType, variety, purchaseDate } = this.growCycle.seedBatch;
		this.seedBatch = `${brand} (${seedType} - ${variety}) ${moment( purchaseDate ).format('MM/DD/YYYY')}`;
	}

	public seedType = (this.growCycle && this.growCycle.seedType) || "";
	public variety = (this.growCycle && this.growCycle.variety) || "";
	public numberOfTrays = (this.growCycle && this.growCycle.numberOfTrays) || null;
	public sowingWeight = {
		amount:  this.growCycle && this.growCycle.sowingWeight && this.growCycle.sowingWeight.amount || null,
		units:  this.growCycle && this.growCycle.sowingWeight && this.growCycle.sowingWeight.units || '',
	} as Quantity

	public seedMedium = (this.growCycle && this.growCycle.seedMedium) || "";
	public soakDurationInHours = (this.growCycle && this.growCycle.soakDurationInHours) || null;
	public germinationDurationInDays = (this.growCycle && this.growCycle.germinationDurationInDays) || null;
	public weightUsed = (this.growCycle && this.growCycle.weightUsed) || "paver";
	public blackOutDurationInDays = (this.growCycle && this.growCycle.blackOutDurationInDays) || "";
	public daysToHarvest = this.growCycle && this.growCycle.daysToHarvest || null;
	public harvestWeight = {
		amount: (this.growCycle && this.growCycle.harvestWeight && this.growCycle.harvestWeight.amount) || null,
		units: (this.growCycle && this.growCycle.harvestWeight && this.growCycle.harvestWeight.units) || null,
	}
	public startDate = moment(this.growCycle && this.growCycle.startDate).format("MM/DD/YYYY HH:mm") || moment().format("MM/DD/YYYY HH:mm");
	public harvestDate = moment(this.growCycle && this.growCycle.harvestDate).format('MM/DD/YYYY');
	public harvestMethod = this.growCycle && this.growCycle.harvestMethod || '';
	public note = "";
	public dailyLightDurationInHours = this.growCycle && this.growCycle.dailyLightDurationInHours || null;
	public percentageIncreaseOverSeedWeight = this.growCycle && this.growCycle.percentageIncreaseOverSeedWeight || null;
	public didStackTrays = this.growCycle && this.growCycle.didStackTrays || null;
	public completed = this.growCycle && this.growCycle.completed || false;
	public dailyGrowNote = '';
	public noteId = '';
	public verifiedComplete =  false;

	public get dailyGrowNotes() {
		let dailyGrowNotes = this.growCycle && this.growCycle.dailyGrowNotes && this.growCycle.dailyGrowNotes || [];
		if (dailyGrowNotes.length > 0) {
			dailyGrowNotes =  dailyGrowNotes.map((note: DailyGrowNotes) => note.message ? `${moment(note.dateTime).format('MM/DD/YYYY HH:mm')} - ${note.message}` : '')
		}
		return dailyGrowNotes;
	}

	public get dailyGrowNoteIds() {
		let dailyGrowNotes = this.growCycle && this.growCycle.dailyGrowNotes && this.growCycle.dailyGrowNotes || [];
		return dailyGrowNotes.map((note: DailyGrowNotes) => note._id);
	}

	rules = [(v: any) => !!v || "Required"];

	public async updateOneGrowCycle() {
		const payload = { 
			id: this.growCycle._id, 
			data: {
				...this.growCycle,
				seedType: this.seedType,
				variety: this.variety,
				numberOfTrays: this.numberOfTrays,
				sowingWeight: this.sowingWeight,
				seedMedium: this.seedMedium,
				soakDurationInHours: this.soakDurationInHours,
				germinationDurationInDays: this.germinationDurationInDays,
				weightUsed: this.weightUsed,
				blackOutDurationInDays: this.blackOutDurationInDays,
				daysToHarvest: this.daysToHarvest,
				harvestWeight: this.harvestWeight,
				startDate: this.startDate,
				harvestDate: this.harvestDate,
				harvestMethod: this.harvestMethod,
				dailyLightDurationInHours: this.dailyLightDurationInHours,
				percentageIncreaseOverSeedWeight: this.percentageIncreaseOverSeedWeight,
				didStackTrays: this.didStackTrays,
				completed: this.completed,
				dailyGrowNotes: [ ...this.dailyGrowNoteIds, this.noteId],
			}
		}
		
		await axios
			.put('/api/updateOneGrowCycle', payload)
			.then(result => {
				console.log('result: ', result);
				let growCycles = [ ...this.$store.state.growCycle.growCycles ];
				growCycles = growCycles.map(growCycle => {
					if (growCycle._id === result.data._id) {
						return result.data;
					}
					return growCycle;
				})
				this.$store.commit('growCycle/addGrowCycles', growCycles)
				// Object.assign(this, result.data)
			})
			.catch(error => console.log('error from updateOneGrowCycle front end', error))
	}

	public async createNewDailyGrowNotes() {
		const payload = {
			message: this.dailyGrowNote,
			dateTime: moment().format('MM/DD/YYYY HH:mm'),
		}
		await axios
			.post('api/createNewDailyGrowNotes', payload)
			.then(async (result) => {
				this.noteId = result.data._id;
				await this.updateOneGrowCycle();
			})
			.catch(error =>
			console.log('error from createDailyEnvironmentalConditions front end', error)
			)

	}

	public get seedVarieties() {
		return this.seedType
			? this.varieties[this.seedType as keyof typeof varieties]
			: [{ name: "Please Choose a seed type" }];
	}

	public verifyCompleted() {
		if (!this.completed) {
			this.submitForm();
			return;
		}
		this.verifiedComplete = confirm('Are you sure you want to complete this grow cycle?  This action cannot be undone.')
		if (this.verifiedComplete) {
			this.submitForm()
		}
	}

	public handleReset() {
		this.success = null;
		(this.$refs.form as any).reset();
	}

	public async submitForm() {
		if ((this.$refs.form as any).validate()) {
			if(this.dailyGrowNote) {
				this.createNewDailyGrowNotes()
				this.dailyGrowNote = '';
				return;
			}
			this.updateOneGrowCycle()
			this.success = true;
		}
	}
}
</script>
