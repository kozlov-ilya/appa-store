const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const bundlePath = path.resolve(__dirname, 'dist');
const publicPath = path.resolve(__dirname, 'public');
const srcPath = path.resolve(__dirname, 'src');

const isProd = process.env.NODE_ENV === 'production';

const getStylesLoaders = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    withModules
      ? {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: !isProd ? '[name]_[local]__[hash:base64:5]' : '[hash:base64]',
              exportLocalsConvention: 'as-is',
              namedExport: false,
            },
          },
        }
      : 'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    {
      loader: 'sass-loader',
      options: {
        additionalData: "@use 'styles/variables.scss' as *;",
      },
    },
  ];
};

const generateAliases = (aliases) => aliases.reduce((acc, val) => ({ ...acc, [val]: path.join(srcPath, val) }), {});

module.exports = {
  target: 'web',
  mode: isProd ? 'production' : 'development',

  entry: path.resolve(srcPath, 'main.tsx'),
  output: { path: bundlePath, filename: '[name].[contenthash].js', clean: true, publicPath: '/' },

  resolve: {
    extensions: ['.tsx', '.jsx', '.ts', '.js'],
    alias: generateAliases(['api', 'components', 'config', 'hooks', 'providers', 'store', 'styles', 'utils', 'routes']),
  },

  module: {
    rules: [
      { test: /\.[tj]sx?/, exclude: /\.json$/, use: 'babel-loader' },
      {
        test: /\.module\.s?css$/,
        use: getStylesLoaders(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getStylesLoaders(),
      },
      {
        test: /\.(png|jpg)$/,
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.json$/,
        type: 'json',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(publicPath, 'index.html'),
    }),
    isProd &&
      new MiniCssExtractPlugin({
        filename: '[name]-[fullhash].css',
      }),
    new TsCheckerPlugin(),
    new EslintWebpackPlugin(),
    new Dotenv({ systemvars: true }),
    !isProd && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),

  devtool: 'source-map',

  devServer: {
    host: 'localhost',
    port: 3000,
    static: {
      directory: publicPath,
    },
    historyApiFallback: true,
  },
};
