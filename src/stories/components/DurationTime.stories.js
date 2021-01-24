import DurationTime from '@renderer/components/DurationTime.vue'

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DurationTime },
  template: '<duration-time :duration="duration" />',
})

export const durationTime = Template.bind({})
durationTime.args = {
  duration: 70000,
}
