const path = require('path')
const rootPath = path.resolve(__dirname, '../')
const rendererPath = path.resolve(__dirname, '../renderer')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.s(c|a)ss$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
      },
    ],
  })

  config.resolve.alias['@'] = rootPath
  config.resolve.alias['~'] = rendererPath
  config.resolve.alias['@renderer'] = rendererPath

  return config
}
