// So far, all this does is add .env to the process environment variables
const { parsed: localEnv } = require('dotenv').config();

const webpack = require('webpack');
module.exports = {
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  },
};
