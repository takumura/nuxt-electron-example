<template>
  <v-container>
    <v-list>
      <v-list-item v-for="todoData in getTodoList" :key="todoData.name">
        <v-list-item-content class="px-2">
          <todo-data :todo="todoData" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import TodoData from './TodoData.vue'
import { accessorType } from '~/store'

export default Vue.extend({
  components: {
    TodoData,
  },
  async fetch() {
    if (window.api) {
      const state: typeof accessorType = await window.api.getInitialState()
      if (state) {
        this.$store.replaceState(state)
      }
    }
  },
  data() {
    return {
      unsubscribe() {},
    }
  },
  computed: {
    getTodoList() {
      return this.$accessor.todos.getTodoList
    },
  },
  mounted() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'todos/add' || mutation.type === 'todos/remove') {
        if (window.api) window.api.syncStore(state)
      }
    })
  },
  beforeDestroy() {
    this.unsubscribe()
  },
})
</script>
