// __dirname: 代表当前文件所在目录的绝对路径  D:\work\190719\workspace\VueComponent
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path') // 用来解析路径相关信息的模块

module.exports = { // 配置对象
  // 入口
  entry: {
    xxx: path.resolve(__dirname, 'src/index.js')
  },
  // 出口
  output: {
    filename: 'static/js/[name].bundle.js', // 可以带路径
    path: path.resolve(__dirname, 'dist')
  },

  // 模块加载器
  module: {
    rules: [
      // 处理 ES6 ==> ES5
      {
        test: /\.js$/, // 用于匹配文件(对哪些文件进行处理)
        // exclude: /node_modules/,
        include: [path.resolve(__dirname, 'src')], // 只针对哪些处理
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // 预设包: 包含多个常用插件包的一个大包
          }
        }
      },
      // 处理CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // 处理图片
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'static/img/[name].[hash:7].[ext]' // 相对于output.path
            }
          }
        ]
      }
    ]
  },

  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html', // 将哪个页面作为模板页面处理(在根目录查找)
      filename: 'index.html' // 生成页面(在output指定的path下)
    })
  ],
  // 开发服务器的配置
  devServer: {
    open: true, // 自动打开浏览器
    // quiet: true, // 不做太多日志输出
  },

  // 开启source-map调试
  devtool: 'cheap-module-eval-source-map',
}