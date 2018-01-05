'use strict'
// Template version: 1.2.6
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      
      // 新歌页
      '/proxy': {
				target: 'http://m.kugou.com',
				changeOrigin: true,
				pathRewrite: {
					'^/proxy': ''
				}
      },

      //歌曲播放
      '/play':{
        target: 'http://www.kugou.com/yy/index.php',
				changeOrigin: true,
				pathRewrite: {
					'^/play': ''
				}
      },

      //获取图片
      '/img':{
        target: 'http://tools.mobile.kugou.com/api/v1/singer_header/get_by_hash',
				changeOrigin: true,
				pathRewrite: {
					'^/img': ''
        },
      },

      //排行榜页
      '/ranking':{
        target: 'http://m.kugou.com/rank/list',
        changeOrigin: true,
				pathRewrite: {
					'^/ranking': 'rank/'
        },
      },

      //排行榜下的歌曲
      '/rankdetail':{
        target: 'http://m.kugou.com/rank/info',
        changeOrigin: true,
				pathRewrite: {
					'^/rankdetail': 'rankdetail/'
        },
      },

      //热门搜索
      '/hotlist':{
        target: 'http://mobilecdn.kugou.com/api/v3/search/hot',
        changeOrigin: true,
				pathRewrite: {
					'^/hotlist': 'search/'
        },
      },

      //搜索歌曲
      '/searchSong':{
        target:'http://mobilecdn.kugou.com/api/v3/search/song',
        changeOrigin: true,
				pathRewrite: {
					'^/searchSong': 'search/'
        },
      },

      // 歌单页
      '/songSheet':{
        target:'http://m.kugou.com/plist/index',
        changeOrigin: true,
				pathRewrite: {
					'^/songSheet': 'songSheet/'
        },
      },
      //歌单下的歌曲列表
      '/sheetDetail':{
        target:'http://m.kugou.com/plist/list',
        changeOrigin:true,
        pathRewrite: {
          '^/sheetDetail': ''
        }
      },
      '/singerClass':{
        target:'http://m.kugou.com/singer/list',
        changeOrigin:true,
        pathRewrite: {
          '^/singerClass': ''
        }
      }
    },

    // Various Dev Server settings
    host: '10.21.40.101', // can be overwritten by process.env.HOST
    port: 7070, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
