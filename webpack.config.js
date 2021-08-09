const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const GlobImporter = require('node-sass-glob-importer');

module.exports = {
  devtool: 'source-map',
  entry: () =>
    glob.sync('./src/friendsChatClient/customisable/**/*.+(scss|css)').reduce(
      (acc, file) => {
        acc[
          file
            .replace(/src\//, 'src/css/')
            .replace(/\.(scss|css)/gi, '')
            .replace(/friendsChatClient\//, '')
        ] = file;
        return acc;
      },
      {
        'src/baseTheme': './src/friendsChatClient/friendsChat.dev.scss',
        ...glob
          .sync('./src/offlineFriendsClient/customisable/**/*.+(scss|css)')
          .reduce(
            (acc, file) => {
              acc[
                file
                  .replace(
                    /src\/offlineFriendsClient\/customisable/,
                    'offlineFriends'
                  )
                  .replace(/\.(scss|css)/gi, '')
              ] = file;
              return acc;
            },
            {
              'offlineFriends/offlineFriends':
                './src/offlineFriendsClient/offlineFriends.dev.scss',
            }
          ),
        ...glob.sync('./src/library/customisable/**/*.+(scss|css)').reduce(
          (acc, file) => {
            acc[
              file
                .replace(/src\/library\/customisable/, 'library')
                .replace(/\.(scss|css)/gi, '')
            ] = file;
            return acc;
          },
          {
            'library/library': './src/libraryClient/library.dev.scss',
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
                importer: GlobImporter(),
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
