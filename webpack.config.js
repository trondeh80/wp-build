const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const PostCssPipelineWebpackPlugin = require('postcss-pipeline-webpack-plugin');
const criticalSplit = require('postcss-critical-split');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssnano = require('cssnano');
const csso = require('postcss-csso');

module.exports = {
  entry: ['@babel/polyfill', 'normalize.css', './src/css/index.scss','./src/index.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]'
          }
        }]
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?sourceMap',
          'resolve-url-loader?sourceMap',
          { loader:'sass-loader', options: { includePaths: [ './node_modules' ] }}
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].chunk.css',
      allChunks: true
    }),

    // Critical CSS processing:
    new PostCssPipelineWebpackPlugin({
      predicate: name => /main.css$/.test(name),
      pipeline: [
        criticalSplit({
          output: criticalSplit.output_types.CRITICAL_CSS
        }),
        cssnano({
          preset: 'default'
        })
      ],
      suffix: 'critical'
    }),

    // Rest of css
    new PostCssPipelineWebpackPlugin({
      predicate: name => /main.css$/.test(name),
      pipeline: [
        criticalSplit({
          output: criticalSplit.output_types.REST_CSS
        }),
        cssnano({
          preset: ['default', {
            zindex: false
          }]
        })
      ],
      suffix: 'rest',
    }),

    // Minify css
    new PostCssPipelineWebpackPlugin({
      predicate: (css) => {
        return css !== 'main.css'; // ignore the main file.
      },
      suffix: 'min',
      pipeline: [csso({
          restructure: false
        })
      ],
      map: {
        inline: false
      }
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};