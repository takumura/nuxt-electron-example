import { getterTree, mutationTree, actionTree } from 'typed-vuex'

export interface Todo {
  id?: number
  name: string
  running: boolean
  done: boolean
}

export interface TodoState {
  list: Todo[]
}

export const state = () => ({
  list: [] as Todo[],
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  getTodoList: (state: TodoState) => state.list,
})

export const mutations = mutationTree(state, {
  add(state, description: string) {
    const todo: Todo = { name: description, running: false, done: false }
    state.list.push(todo)
  },
  remove(state, todo: Todo) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  runTask(state, todo: Todo) {
    const isRunning = todo.running
    state.list
      .filter((x) => x.running)
      .forEach((x) => {
        x.running = false
      })
    todo.running = !isRunning
  },
  toggle(_, todo: Todo) {
    todo.done = !todo.done
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    add({ commit }, description: string) {
      commit('add', description)
    },
    remove({ commit }, todo: Todo) {
      commit('remove', todo)
    },
    runTask({ commit }, todo: Todo) {
      commit('runTask', todo)
    },
    toggle({ commit }, todo: Todo) {
      commit('toggle', todo)
    },
  }
)
