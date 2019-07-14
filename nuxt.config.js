
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '//use.fontawesome.com/releases/v5.4.2/css/all.css'},
      { rel: 'stylesheet', type: 'text/css', href: '//fonts.googleapis.com/css?family=Assistant|PT+Serif'},
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
    '@/assets/styles/application.sass'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/map.js',
    '~/plugins/axios.js'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    ['prismic-nuxt', {
      endpoint: 'https://labete.cdn.prismic.io/api/v2',
      linkResolver: function(doc, ctx) {
        return '/'
      }
    }],
    ['nuxt-i18n', {
      locales: [
        {
          name: 'English',
          code: 'en',
          iso: 'en-CA',
          file: 'en.js'
        },
        {
          name: 'Francais',
          code: 'fr',
          iso: 'fr-CA',
          file: 'fr.js'
        }
      ],
      langDir: 'locales/',
      defaultLocale: 'fr',
      lazy: true
    }],
    '@nuxtjs/axios'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
    transpile: [/^vue2-google-maps($|\/)/, 'vue2-gmap-custom-marker'],
  }
}
