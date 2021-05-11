<template>
	<v-card class="" max-width="1000" >
		<v-toolbar color="green" dense>
			<v-toolbar-title>{{ `${capitalize(growCycle.seedType)} - ${capitalize(growCycle.variety)}` }}</v-toolbar-title>
				<v-spacer/>
				<v-btn icon dark @click="deleteGrowCycle">
					<v-icon>mdi-close</v-icon>
				</v-btn>
		</v-toolbar>
		<v-card-text>
			
			<h3>Start Date: {{ growCycle.startDate }}</h3>
			<h3>Duration: {{ growCycleDuration }}</h3>
			<h3>
				Number of trays: {{ growCycle.numberOfTrays }}
			</h3>
			<h3>
				Soak time: {{ growCycle.soakDurationInHours }} hours
			</h3>
			<h3>Growing medium: {{ growCycle.seedMedium }}</h3>
		</v-card-text>
		<v-card-actions>
			<v-dialog
				v-model="viewEditModal"
				transition="dialog-bottom-transition"
				width="900"
			>
				<template v-slot:activator="{ on, attrs }">
				
					<v-btn
						@click="selectGrowCycle(growCycle)"
						class="no_radius left-radius"
						color="purple"
					>
						<v-icon>{{ mdiEye }}</v-icon>
						&nbsp; View
					</v-btn>

					<v-btn
						@click="setMode('edit')"
						class="no_radius"
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
						<v-toolbar-title>Edit grow cycle</v-toolbar-title>
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
						class="no_radius right-radius"
						v-bind="attrs"
						v-on="on"
					>
						<v-icon>{{ mdiWateringCanOutline }}</v-icon>
						&nbsp; Water
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

<style lang="scss" scoped>
button.no_radius.v-btn {
	border-radius: 0 !important;
}

button.no_radius.v-btn.left-radius {
	border-top-left-radius: 4px !important;
	border-bottom-left-radius: 4px !important;
}
button.no_radius.v-btn.right-radius {
	border-top-right-radius: 4px !important;
	border-bottom-right-radius: 4px !important;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { GrowCycle } from '~/types/types'
import { 
	mdiPencil, 
	mdiEye, 
	mdiWateringCanOutline,
	mdiThermometerPlus 
} from '@mdi/js'
import ViewEditGrowCycle from '~/components/ViewEditGrowCycle.vue'
import CreateWaterEntry from '~/components/CreateWaterEntry.vue'
import convertMilliseconds from '~/helpers/convertMilliseconds'
import capitalize from '~/helpers/capitalize'
import axios from 'axios';
@Component({
  components: {
    ViewEditGrowCycle,
    CreateWaterEntry,
  }
})
export default class GrowCycleCard extends Vue {
	@Prop({})
	public growCycle!: GrowCycle

	@Prop({})
	public selectGrowCycle!: (growCycle: GrowCycle) => {}
	
	public mdiPencil = mdiPencil
	public mdiEye = mdiEye
	public mdiWateringCanOutline = mdiWateringCanOutline
	public mdiThermometerPlus = mdiThermometerPlus

	public capitalize = capitalize;


	public viewEditModal = false
	public wateringEntryModal = false
	public mode = ''

	public get growCycleDuration () {
		const startDate: any = new Date(this.growCycle.startDate as string)
		const today: any = new Date(Date.now())
		const difference = today - startDate
		const { d, h, m } = convertMilliseconds(difference)

		return `${d}d:${h}h:${m}m`
	}

	public setMode (mode: 'view' | 'edit') {
		this.mode = mode
	}

	public async deleteGrowCycle() {
		const confirmation = confirm('Are you sure you want to delete this grow cycle?  This action cannot be undone...')
		if (confirmation) {
			await axios
				.delete(`/api/deleteGrowCycle`, {
					params: {
						id: this.growCycle._id
					}
				})
				.then(() => {
					const growCycles = [ ...this.$store.state.growCycle.growCycles ];
					// update array of growCycles after removing the deleted growCycle, and then add it to the store
					const updatedGrowCycles = growCycles.filter((growCycle: GrowCycle) => growCycle._id !== this.growCycle._id);
					this.$store.commit('growCycle/addGrowCycles', updatedGrowCycles)
				})
				.catch(error => console.log('error from delete grow cycle'))
		}
	}

}
</script>
