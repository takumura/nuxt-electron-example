<template>
  <div>
    <v-text-field label="Todo" hint="What needs to be done?" @keyup.enter="addTodo"></v-text-field>
    <todo-list></todo-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TodoList from '~/components/TodoList.vue'

export default Vue.extend({
  components: {
    // eslint-disable-next-line vue/no-unused-components
    TodoList,
  },
  methods: {
    addTodo(e: Event): void {
      if (e.target instanceof HTMLInputElement) {
        this.$accessor.todos.add(e.target.value)
        e.target.value = ''
      }
    },
  },
})
</script>
