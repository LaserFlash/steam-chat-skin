const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScripts = require('webpack-remove-empty-scripts');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const GlobImporter = require('node-sass-glob-importer');

module.exports = {
  watchOptions: {
    poll: true,
    ignored: '**/node_modules',
  },
  devtool: 'source-map',
  entry: () =>
    glob.sync('./src/friends-client/customisable/**/*.+(scss|css)').reduce(
      (acc, file) => {
        acc[
          file
            .replace(/src\//, 'src/css/')
            .replace(/\.(scss|css)/gi, '')
            .replace(/friends-client\//, '')
        ] = file;
        return acc;
      },
      {
        'src/baseTheme': './src/friends-client/friendsChat.dev.scss',
        ...glob
          .sync('./src/friends-offline-client/customisable/**/*.+(scss|css)')
          .reduce(
            (acc, file) => {
              acc[
                file
                  .replace(
                    /src\/friends-offline-client\/customisable/,
                    'offlineFriends'
                  )
                  .replace(/\.(scss|css)/gi, '')
              ] = file;
              return acc;
            },
            {
              'offlineFriends/offlineFriends':
                './src/friends-offline-client/offlineFriends.dev.scss',
            }
          ),
      }
    ),
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    preferRelative: true,
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
              additionalData: `$VERSION: ${process.env.npm_package_version};`,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset/inline',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [new RemoveEmptyScripts(), new MiniCssExtractPlugin()],
};
