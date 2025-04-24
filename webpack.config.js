const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  mode: 'development',  // 或 'production'，根据需要调整
  entry: './src/index.js',  // 你的入口文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'gmCrypto.umd.js',  // 输出的文件名
    library: 'gmCrypto',  // 如果你想给库取一个名字，可以设置这个
    libraryTarget: 'umd',  // 使其兼容浏览器、CommonJS 和 AMD
  },
  resolve: {
    fallback: {
      "buffer": require.resolve("buffer/"),
      "base64-js": require.resolve("base64-js"),
      "jsbn": require.resolve("jsbn")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,  // 匹配所有 .js 文件
        exclude: /node_modules/,  // 排除 node_modules 目录
        use: {
          loader: 'babel-loader',  // 使用 Babel 转译
        },
      }
    ]
  },
  plugins: [
    new NodePolyfillPlugin()  // 用于处理 Node.js 核心模块
  ]
};
