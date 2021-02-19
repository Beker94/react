const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpuckPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

const filename = (ext) => {
  return isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: isDev ? "development" : "production",
  entry: ["./index.js"],
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  devtool: isDev ? "source-map" : false,
  devServer: {
    port: 3000,
    hot: isDev,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpuckPlugin({
      template: "index.html",
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/favicon.ico"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "entry",
                },
              ],
              "@babel/preset-react",
            ],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
};
