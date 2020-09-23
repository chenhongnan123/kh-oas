module.exports = {
  "publicPath": "./",
  "devServer": {
    "proxy": {
      "/server": {
        "target": "http://192.168.1.95/server",
        "changeOrigin": true,
        "pathRewrite": {
          "^/server": ""
        }
      }
    }
  },
  "transpileDependencies": [
    "resize-detector",
    "vuetify"
  ]
}