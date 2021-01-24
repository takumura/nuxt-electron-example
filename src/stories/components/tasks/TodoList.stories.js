import store from '@/.storybook/preview'
import TodoList from '@renderer/components/TodoList'

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TodoList },
  template: '<todo-list />',
  store,
})

export const todoList = Template.bind({})
