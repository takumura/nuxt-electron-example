<template>
  <v-card class="mx-auto">
    <v-container class="ma-0">
      <v-row class="px-2">
        <v-col class="d-flex align-center">
          {{ todo.name }}
        </v-col>
        <v-spacer></v-spacer>
        <v-col>
          <start-stop-button :todo="todo" @startStopButtonClicked="startStopButtonClicked"></start-stop-button>
        </v-col>
        <v-col>
          <duration-time :duration="duration" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue'
import { Todo } from '../store/todos'
import DurationTime from './DurationTime.vue'
import StartStopButton from './StartStopButton.vue'

export default Vue.extend({
  props: {
    todo: {
      type: Object as () => Todo,
      required: true,
    },
  },
  data() {
    return { duration: 0 }
  },
  // eslint-disable-next-line vue/order-in-components
  components: {
    DurationTime,
    StartStopButton,
  },
  methods: {
    startStopButtonClicked(): void {
      const initialTime = window.performance.now()
      const frame = window.requestAnimationFrame
      const callback = (currentTime: number, previousTime: number) => {
        if (this.todo.running) {
          this.duration = this.duration + (currentTime - previousTime)
          frame((timestamp) => callback(timestamp, currentTime))
        }
      }
      frame((timestamp) => callback(timestamp, initialTime))
    },
  },
})
</script>
