export const state = () => ({
	growCycles: []
})

export const mutations = {
	addGrowCycles(state, growCycles) {
		if (Array.isArray(growCycles)) {
			state.growCycles = [...growCycles]
		} else {
			state.growCycles = [...state.growCycles, ...growCycles]
		}
	},
}
