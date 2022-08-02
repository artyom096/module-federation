const path = require("path");
const deps = require("./package.json").dependencies;

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.scss$/;
const sassModuleRegex = /\.module\.scss$/;

const plugins = [
  new HtmlWebpackPlugin({
    template: "./public/index.html",
  }),
  new ModuleFederationPlugin({
    name: "remote",
    filename: "remoteEntry.js",
    exposes: {
      "./RemoteApp": "./src/App.tsx",
    },
    shared: {
      ...deps,
      react: {
        requiredVersion: deps.react,
        eager: true,
        singleton: true
      },
      "react-dom": {
        requiredVersion: deps["react-dom"],
        eager: true,
        singleton: true
      },
    },
  }),
];

const configuration = {
  entry: "./src/index.tsx",
  target: "web",
  mode: "development",
  devServer: {
    port: 3001,
    historyApiFallback: true,
    open: true,
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "http://localhost:3001/",
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: "ts-loader",
          options: {
            compilerOptions: {
              noEmit: false,
            },
          },
        },
        exclude: /node_modules/,
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: [
          "style-loader",
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "icss",
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: sassModuleRegex,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[path]__[local]--[hash:base64:5]",
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".jsx", ".js"],
    modules: ["node_modules", "src"],
  },
  plugins,
};

module.exports = configuration;
