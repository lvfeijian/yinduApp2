module.exports = {

  publicPath: "./",// 需要配置 否则打包后的apk文件安装在手机可能白屏
  // devServer: {
  //   proxy: {
  //     //如果地址以/api开头，它就会请求到 http://ydapp.cenvr.com
  //     '/api': {
  //       target: 'http://ydapp.cenvr.com',
  //       changeOrigin: true,
  //       ws: true,
  //       pathRewrite: {
  //         '^/api': '',   //重写请求路径
  //       },
  //     }
  //   }
  // },
  // productionSourceMap: false

}