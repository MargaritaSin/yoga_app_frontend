const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer: {
      proxy: {
          '/api': {
              target: 'http://localhost:8080', // Порт backend приложения
              ws: true,
              changeOrigin: true
          }
      }
  }
}
