import store from '@/.storybook/preview'
import TodoData from '@renderer/components/TodoData.vue'

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TodoData },
  template: '<todo-data :todo="todo" />',
  store,
})

export const todoData = Template.bind({})
todoData.args = {
  todo: { name: 'task1', running: false, done: false },
}
