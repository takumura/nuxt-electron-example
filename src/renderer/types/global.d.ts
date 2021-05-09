import { accessorType } from '~/store'

declare global {
  interface Window {
    api: Sandbox
  }
}

export interface Sandbox {
  getInitialState: () => Promise<typeof accessorType>
  syncStore: (state: string) => void
}
