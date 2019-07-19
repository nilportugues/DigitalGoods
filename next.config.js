
const withPlugins = require('next-compose-plugins')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const withImages = require('next-images')
const nextConfig = {
  target: 'serverless',
}

if (typeof require !== "undefined") {
  require.extensions[".less"] = () => {};
  require.extensions[".css"] = (file) => {};
}

module.exports = withPlugins([withSass, withCSS, withImages], nextConfig)
