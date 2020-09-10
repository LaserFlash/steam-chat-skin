const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: () =>
    glob.sync('./src/customisable/**/*.+(scss|css)').reduce(
      (acc, file) => {
        acc[
          file.replace(/src\//, 'src/css/').replace(/\.(scss|css)/gi, '')
        ] = file;
        return acc;
      },
      {
        'src/baseTheme': './src/baseTheme.dev.scss',
      }
    ),
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'src')],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [new FixStyleOnlyEntriesPlugin(), new MiniCssExtractPlugin()],
};
