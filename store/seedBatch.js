export const state = () => ({
	seedBatches: [],
	filteredBatches: []
})

export const mutations = {
	addSeedBatches(state, seedBatches) {
		state.seedBatches = [...state.seedBatches, ...seedBatches]
	},
	addFilteredBatches(state, filteredBatches) {
		state.filteredBatches = filteredBatches
	}
}

export const actions = {
	async getSeedBatchesBySeedType(context, payload) {
		const { seedType, variety, seedBatches } = payload
		const result = seedBatches.filter(batch => {
			if (batch.seedType === seedType && batch.variety === variety && !batch.isUsedUp) {
				return batch
			}
		})
		await context.commit('addFilteredBatches', result)

	}
}