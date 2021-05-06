<template>
  <v-app dark>
    <v-container>
      <nuxt />
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class DefaultLayout extends Vue {}
</script>
