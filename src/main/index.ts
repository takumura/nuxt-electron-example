import nuxtConfig from '../renderer/nuxt.config'
const http = require('http')
const path = require('path')
const { Nuxt, Builder } = require('nuxt')
const electron = require('electron')

// @ts-ignore
nuxtConfig.rootDir = path.resolve('src/renderer')
// @ts-ignore
const isDev = nuxtConfig.dev
let _NUXT_URL_ = ''

const nuxt = new Nuxt(nuxtConfig)
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

    createElectronApp()
  })
} else {
  _NUXT_URL_ = 'file://' + path.resolve(__dirname, '../../dist/nuxt-build/index.html')
  createElectronApp()
}

function createElectronApp() {
  let win: any = null
  const app = electron.app
  const newWin = () => {
    win = new electron.BrowserWindow({
      width: 1400,
      height: 1000,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: false,
        preload: path.resolve(path.join(__dirname, 'preload.js')),
        webSecurity: false,
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

  app.on('ready', newWin)
  app.on('window-all-closed', () => app.quit())
  app.on('activate', () => win === null && newWin())
}
