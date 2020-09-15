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
        ...glob
          .sync('./src/offlineFriends/customisable/**/*.+(scss|css)')
          .reduce(
            (acc, file) => {
              acc[
                file
                  .replace(
                    /src\/offlineFriends\/customisable/,
                    'offlineFriends'
                  )
                  .replace(/\.(scss|css)/gi, '')
              ] = file;
              return acc;
            },
            {
              'offlineFriends/offlineFriends':
                './src/offlineFriends/offlineFriends.dev.scss',
            }
          ),
      }
    ),
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
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
