<template>
  <v-app>
    <v-main>
      <AMap />
    </v-main>
  </v-app>
</template>

<script>
import AMap from './components/AMap.vue'

export default {
  name: 'App',

  components: {
    AMap,
  },

  data: () => ({
    //
  }),
}
</script>
