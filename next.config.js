const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const webpack = require('webpack');
require('dotenv').config;
const path = require('path');
const Dotenv = require('dotenv-webpack');
const nextConfig = {
  target: 'server',
  webpack: config => {
    config.plugins = config.plugins || [];
    config.plugins.push(
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    );
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    });

    return config;
  }
};

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
  require.extensions['.css'] = file => {};
}

module.exports = withPlugins([withSass, withCSS, withImages], nextConfig);
