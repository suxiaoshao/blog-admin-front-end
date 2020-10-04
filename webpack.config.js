/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');
const OptimizationCss = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
module.exports = (env, argv) => {
  console.log('---', env || argv.mode, '---');
  const devMode = argv.mode === 'development' || env !== 'production';
  if (devMode) {
    return {
      mode: 'development',
      entry: {
        app: path.join(__dirname, 'src', 'index.tsx'),
      },
      target: 'web',
      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.s?css$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
          },
          {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  name: '[name]-[hash:5].min.[ext]',
                  limit: 8192,
                  esModule: false,
                },
              },
            ],
          },
          {
            test: /\.js$/,
            enforce: 'pre',
            use: ['source-map-loader'],
          },
        ],
      },
      output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, 'src', 'index.ejs'),
        }),
        new webpack.HotModuleReplacementPlugin(),
      ],
      devServer: {
        port: 8084,
        contentBase: path.resolve(__dirname, 'build'),
        compress: true,
        hot: true,
        historyApiFallback: true,
        host: '0.0.0.0',
      },
      devtool: 'inline-source-map',
    };
  } else {
    return {
      mode: 'production',
      entry: {
        app: path.join(__dirname, 'src', 'index.tsx'),
      },
      target: 'web',
      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: [
              {
                loader: 'babel-loader',
              },
              'ts-loader',
            ],
            exclude: /node_modules/,
          },
          {
            test: /\.s?css$/,
            use: [
              MiniCss.loader,
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: ['postcss-preset-env'],
                  },
                  sourceMap: false,
                },
              },
              'sass-loader',
            ],
          },
          {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  name: '[name]-[hash:5].min.[ext]',
                  limit: 8192,
                  esModule: false,
                },
              },
            ],
          },
        ],
      },
      output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, 'src', 'index.ejs'),
          minify: {
            collapseWhitespace: true,
            removeComments: true,
          },
        }),
        new MiniCss(),
        new OptimizationCss(),
        new CleanWebpackPlugin(),
        new MonacoWebpackPlugin({
          languages: ['markdown'],
        }),
        new CompressionPlugin({
          algorithm: 'gzip',
          threshold: 10240,
          minRatio: 0.8,
        }),
      ],
      optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          // name: true,
          cacheGroups: {
            vendors: {
              test: /\/node_modules\//,
              priority: -10,
              chunks: 'initial',
            },
            'react-vendor': {
              test: /react/,
              priority: 1,
              chunks: 'initial',
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      },
    };
  }
};
