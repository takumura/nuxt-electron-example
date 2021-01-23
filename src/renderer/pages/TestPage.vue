<template>
  <div>
    <duration-time :duration="312230" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DurationTime from '~/components/DurationTime.vue'

export default Vue.extend({
  components: {
    DurationTime,
  },
})
</script>
