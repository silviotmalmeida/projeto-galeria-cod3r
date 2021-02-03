//recebe false se a variável NODE_ENV estiver setada como production
const modoDev = process.env.NODE_ENV !== "production";

//
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  //definindo o modo a partir da variável modoDev
  mode: modoDev ? "development" : "production",

  //definindo a página inicial do projeto
  entry: "./src/index.js",

  //configurando o servidor de desenvolvimento
  devServer: {
    //pasta de saída do projeto (não será criada em modo de desenvolvimento)
    contentBase: "./build",

    //porta
    port: 3003,
  },

  //configurações de otimizadores
  optimization: {
    //configurações de minificadores
    minimizer: [
      //minificador de js
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),

      //minificador de CSS
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  //configurações de saída (não será criada em modo de desenvolvimento)
  output: {
    filename: "app.js",
    path: __dirname + "/build",
  },
  //configurações de plugin
  plugins: [
    //plugin para extrair o css de saída
    new MiniCssExtractPlugin({ filename: "estilo.css" }),
    //plugin para extrair os html e imagens
    new CopyWebpackPlugin([
      { context: "src/", from: "**/*.html" },
      { context: "src/", from: "imgs/**/*" },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader', // Adiciona CSS a DOM injetando a tag <style>
          "css-loader", // interpreta @import, url()...
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)$/,
        use: ["file-loader"],
      },
    ],
  },
};
