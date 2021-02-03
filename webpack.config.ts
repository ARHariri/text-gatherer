// import webpack from 'webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const webpackConfig = {
  entry: path.join(__dirname, './src/index.ts'),
  devtool: 'cheap-source-map',
  mode: 'development',
  target: 'node',
  stats: 'minimal',
  output: {
    filename: 'built.js',
    path: path.join(__dirname, './build'),
  },
  externals: [nodeExternals()],
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve('src')],
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.ts',
        enabled: true,
      },
      async: true,
      typescript: true,
    }),
  ],
};

export default webpackConfig;
