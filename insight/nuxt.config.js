
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel:"stylesheet", href:"https://fonts.googleapis.com/icon?family=Material+Icons"},
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Muli:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Roboto:wght@300;400;500&display=swap" },
      { rel: 'stylesheet', href: '/global.css'},
      {rel: 'stylesheet', href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"},
      {rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@700&family=Courgette&family=Dancing+Script:wght@500;700&family=Indie+Flower&family=Lobster&family=Pacifico&family=Permanent+Marker&family=Roboto+Mono:ital,wght@0,300;0,400;1,300;1,400&family=Satisfy&family=Shadows+Into+Light&display=swap"},

    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src:'~/plugins/AppPlugin.js',ssr:false},
    {src:'~/plugins/FirebasePlugin.js', ssr:false},

  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/device',
    '@nuxtjs/svg',
  ],
 
/*
 // Auth Module 
 auth:{
  token: {
      prefix: '_ins.'
  },
  localStorage: false,
  cookie: {
      options : {
          path: '/'
        }
  }
 },
*/

  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURl: process.env.SERVER_API
  },
  router:{

  },
  /*
  ** Build configuration
  */
  build: {
    loaders:{
      vue:{
        transformAssetUrls: {
          audio: 'src'
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options:{
          name:'[path][name].[ext]'
        }
      })
    }
  }
}
