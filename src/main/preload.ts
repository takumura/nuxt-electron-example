const { contextBridge, ipcRenderer } = require('electron')

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
  getInitialState: () => ipcRenderer.invoke('GET_STORE_VALUE', 'data'),
  syncStore: (state: string) => ipcRenderer.send('SYNC_STORE', state),
})
