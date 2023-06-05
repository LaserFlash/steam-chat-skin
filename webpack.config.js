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
  entry: () => {
    const friendsClient = glob
      .sync('./src/friends-client/customisable/**/*.+(scss|css)')
      .reduce(
        (acc, file) => {
          acc[
            file
              .replace(/src\/friends-client\/customisable/, 'friends-client')
              .replace(/\.(scss|css)/gi, '')
          ] = file;
          return acc;
        },
        {
          'friends-client/friends-client':
            './src/friends-client/friendsChat.dev.scss',
        }
      );

    const steamClient = glob
      .sync('./src/steam-client/customisable/**/*.+(scss|css)')
      .reduce(
        (acc, file) => {
          acc[
            file
              .replace(/src\/steam-client\/customisable/, 'steam-client')
              .replace(/\.(scss|css)/gi, '')
          ] = file;
          return acc;
        },
        {
          'steam-client/steam-client':
            './src/steam-client/steam-client.dev.scss',
        }
      );

    return { ...friendsClient, ...steamClient };
  },
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
            loader: 'postcss-loader',
            options: {
              postcssOptions: { plugins: ['postcss-preset-env'] },
            },
          },
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
    minimize: false,
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [new RemoveEmptyScripts(), new MiniCssExtractPlugin()],
};
