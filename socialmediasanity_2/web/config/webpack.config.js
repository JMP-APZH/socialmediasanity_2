/** @returns {import('webpack').Configuration} Webpack Configuration */
module.exports = (config, { mode }) => {
  if (mode === 'development') {
    // Add dev plugin
    // module: {
    //   rules: [
    //     { test: /\.mp4$/, use: 'file-loader?name=videos/share.mp4', },
    //   ],
    // }
  }

  // Add custom rules for your project
  // config.module.rules.push(YOUR_RULE)
  // module: {
  //   rules: [
  //     { test: /\.mp4$/,
  //     use: 'file-loader?name=videos/[name].[ext]', },
  //   ],
  // }

  // Add custom plugins for your project
  // config.plugins.push(YOUR_PLUGIN)

  return config
}
