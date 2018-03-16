const webpack = require('atool-build/lib/webpack');

module.exports = function (webpackConfig, env) {
  // Support hmr
  if (env === 'development') {
    webpackConfig.devtool = '#eval';
    webpackConfig.babel.plugins.push('dva-hmr');
  } else {
    webpackConfig.babel.plugins.push('dev-expression');
  }

  // Don't extract common.js and common.css
  webpackConfig.plugins = webpackConfig.plugins.filter(function (plugin) {
    return !(plugin instanceof webpack.optimize.CommonsChunkPlugin);
  });

  // 全局暴露React
  webpackConfig.plugins.push(
    new webpack.ProvidePlugin({
      React: 'preact',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  );

  // Support CSS Modules
  // Parse all less files as css module.
  webpackConfig.module.loaders.forEach(function (loader, index) {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.less$/;
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.less$/;
    }
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.css$/;
    }
    if (loader.test.toString() === '/\\.module\\.css$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.css$/;
    }
    // 支持webp
    if (loader.test.toString().includes('png|jpg|jpeg|gif')) {
      loader.test = /\.(png|webp|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i;
    }
  });

  webpackConfig.resolve.alias = {
    "react": 'preact-compat',
    "react-dom": "preact-compat",
    "create-react-class": "preact-compat/lib/create-react-class",
    assets: __dirname + '/src/assets',
    components: __dirname + '/src/components',
    models: __dirname + '/src/models',
    pages: __dirname + '/src/pages',
    services: __dirname + '/src/services',
    utils: __dirname + '/src/utils',
    configs: __dirname + '/src/configs',
    images: __dirname + '/src/images',
    assets: __dirname + '/src/assets',
  }
  return webpackConfig;
};
