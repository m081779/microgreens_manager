export const state = () => ({
	growCycles: []
})

export const mutations = {
	add(state, growCycles) {
		state.growCycles = growCycles
	},
}
