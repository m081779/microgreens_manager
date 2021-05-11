<template>
	<div>{{growCycle}}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator';
import { GrowCycle } from '~/types/types';

@Component<GrowCycleDetails>({

})
export default class GrowCycleDetails extends Vue {
	@Prop({})
	growCycle!: GrowCycle;
	
	created() {
		console.log('YAAAAAAAY',this.growCycle)
	}
}
</script>