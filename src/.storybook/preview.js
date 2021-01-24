import { addDecorator } from '@storybook/vue'
import Vue from 'vue'
import Vuex from 'vuex'
import { useAccessor } from 'typed-vuex'

import Vuetify from 'vuetify'
import { VApp, VContent } from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/dist/vuetify.min.css'

import * as rootStore from '@renderer/store'
import * as todos from '@renderer/store/todos'

// setup Vuex with Typed Vuex
Vue.use(Vuex)
export const storePattern = {
  state: rootStore.state,
  getters: rootStore.getters,
  actions: rootStore.actions,
  mutations: rootStore.mutations,
  modules: {
    todos: {
      namespaced: true,
      state: {
        list: [
          { name: 'task1', done: false, running: false },
          { name: 'task2', done: false, running: false },
          { name: 'task3', done: false, running: true },
          { name: 'task4', done: false, running: false },
          { name: 'task5', done: false, running: false },
        ],
      },
      getters: todos.getters,
      actions: todos.actions,
      mutations: todos.mutations,
    },
  },
}
const store = new Vuex.Store(storePattern)
export const accessor = useAccessor(store, storePattern)
Vue.prototype.$accessor = accessor

export default store

// Setup vuetify
const vuetifyOptions = {}

Vue.use(Vuetify, {
  iconfont: 'mdi',
  customVariables: ['~/assets/variables.scss'],
  theme: {
    dark: true,
    themes: {
      light: {
        primary: colors.purple,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
      },
      dark: {
        primary: colors.blue.darken2,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3,
      },
    },
  },
})

addDecorator(() => ({
  vuetify: new Vuetify(vuetifyOptions),
  components: { VApp, VContent },
  template: `<v-app><v-main><story/></v-main></v-app>`,
}))

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}
