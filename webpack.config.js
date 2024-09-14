const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './dialogue.js',
  output: {
    filename: 'dialogue.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  plugins: [
    new Dotenv(),
  ],
};