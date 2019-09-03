const path = require("path");

module.exports = {
  entry: './src/app.js',
  mode: 'production',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'docs')
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  stats: {
    warnings: false,
    modules: false,
    hash: false,
    version: false,
    children: false
  }
};
