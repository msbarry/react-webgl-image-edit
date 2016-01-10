'use strict';
// Gets called when running npm start

const express = require('express');
const ip = require('ip');
const openepage = require('opener');

const app = express();

const PROD = process.env.NODE_ENV === 'production';

if (PROD) {
  app.use(express.static('dist'));
} else {
  const webpack = require('webpack');
  const config = require('../webpack.config');
  const ProgressPlugin = require('webpack/lib/ProgressPlugin');
  const compiler = webpack(config);
  compiler.apply(new ProgressPlugin((percentage, msg) => {
    process.stdout.write(`  ${msg} ${(percentage * 100).toFixed(0)}%\r`);
  }));

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    quiet: false,
    noInfo: false,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.listen(3000, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Server started');
    console.log(`Your app is available at http://${ip.address()}:3000!`);
    openepage(`http://${ip.address()}:3000`);
  }
});
