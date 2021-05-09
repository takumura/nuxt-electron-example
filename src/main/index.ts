import nuxtConfig from '../renderer/nuxt.config'
const http = require('http')
const path = require('path')
const { Nuxt, Builder } = require('nuxt')
const { app, BrowserWindow, ipcMain } = require('electron')

// @ts-ignore
nuxtConfig.rootDir = path.resolve('src/renderer')
// @ts-ignore
const isDev = nuxtConfig.dev
let _NUXT_URL_ = ''

const nuxt = new Nuxt(nuxtConfig)
const storeFilePathString = path.join(app.getPath('documents'), './electron-app')

if (isDev) {
  nuxt.ready().then((n: { render: any }) => {
    const builder = new Builder(n)
    const server = http.createServer(n.render)

    builder.build().catch((err: any) => {
      console.error(err)
      process.exit(1)
    })
    server.listen()
    _NUXT_URL_ = `http://localhost:${server.address().port}`
    console.log(`Nuxt working on ${_NUXT_URL_}`)
  })
} else {
  _NUXT_URL_ = 'file://' + path.resolve(__dirname, '../../dist/nuxt-build/index.html')
}

createElectronApp()

function createElectronApp() {
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win: any = null

  const newWin = () => {
    win = new BrowserWindow({
      width: 1400,
      height: 1000,
      webPreferences: {
        contextIsolation: true,
        preload: path.resolve(path.join(__dirname, 'preload.js')),
      },
    })

    win.on('closed', () => (win = null))

    if (isDev) {
      const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')

      installExtension(VUEJS_DEVTOOLS.id)
        .then((name: any) => {
          console.log(`Added Extension:  ${name}`)
          win.webContents.openDevTools()
        })
        .catch((err: any) => console.log('An error occurred: ', err))

      const pollServer = () => {
        http
          .get(_NUXT_URL_, (res: any) => {
            if (res.statusCode === 200) {
              win.loadURL(_NUXT_URL_)
            } else {
              console.log('restart poolServer')
              setTimeout(pollServer, 300)
            }
          })
          .on('error', pollServer)
      }

      pollServer()
    } else {
      return win.loadURL(_NUXT_URL_)
    }
  }

  // setup electron-store for persisted state
  const Store = require('electron-store')
  const store = new Store({ cwd: storeFilePathString })
  ipcMain.handle('GET_STORE_VALUE', (_: any, key: any) => {
    const result = store.get(key)
    return result
  })
  ipcMain.on('SYNC_STORE', (_: any, args: any) => {
    store.set('data', args)
  })

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', newWin)

  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => win === null && newWin())
}
