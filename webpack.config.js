// webpack.config.js
module.exports = {
  entry: './src/app.js',
  output: {
    filename: './site/app.js'       
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'] 
  }
};