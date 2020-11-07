module.exports = {
  assetsDir: 'static',
  publicPath: './',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    https: false,
    proxy: {
      '/api': {
        target: 'http://172.16.110.18:5013',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    },
  },
}