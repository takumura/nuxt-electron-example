const path = require('path')
const rootPath = path.resolve(__dirname, '../src/renderer')

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

  config.resolve.alias['~'] = rootPath
  config.resolve.alias['@'] = rootPath

  return config
}
