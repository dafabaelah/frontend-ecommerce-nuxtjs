require('dotenv').config();

export default {
  server: {
    port: process.env.PORT || 3000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend-ecommerce',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/images/logo.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'},
    ],
    script: [
      { src: '/js/coreui.bundle.min.js' }, 
      { src: 'https://app.sandbox.midtrans.com/snap/snap.js', 'data-client-key': process.env.DATA_CLIENT_MIDTRANS }, 
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/style.min.css',
    '@/assets/css/custom.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-star-rating.js', mode: 'client' },
    { src: '~/plugins/chart.js', mode: 'client' },
    { src: '~/plugins/mixins.js' },
    { src: '~/plugins/vue-image-zoomer.js', mode: 'client' },
    { src: '~/plugins/network-status.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/pwa',
  ],

  pwa: {
    meta: {
      title: 'MI STORE - Distributor Xiaomi Indonesia Resmi',
      author: 'Xiaomi Indonesia'
    },

    manifest: {
      name: 'Xiaomi',
      short_name: 'xiaomi',
      description: 'Official Toko Online Penjualan Produk Xiaomi',
      lang: 'en'
    },

    icon: {
      fileName: 'images/logo.png',
      sizes: [64, 120, 144, 152, 192, 384, 512]
    },

    workbox: {
      runtimeCaching: [
        {
          urlPattern: '/*',
          handler: 'networkFirst',
          method: 'GET',
          strategyOptions: { 
            cacheName: 'my-cache' ,
            cacheExpiration: {
              maxEntries: 100, // maksimal 100 item
              maxAgeSeconds: 7 * 24 * 60 * 60, // 7 hari, 24 jam, 60 menit, 60 detik
            }
          }
        }
      ]
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'vue-sweetalert2/nuxt',
    '@nuxtjs/dotenv',
    '@nuxtjs/proxy',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  axios: {
    // baseURL: process.env.BE_BASE_URL || 'http://localhost:8000'
    proxy: true
  },

  proxy: {
    '/api/': {
      target: process.env.BE_BASE_URL || 'http://localhost:8000',
      pathRewrite: { '^/': '' }
    }
  },

  loading: {
    color: 'blue',	// <-- color
    height: '5px'	// <-- height
  },

  // Target Deployment
  target: 'server',

  //rendering mode SSR	
  ssr: true,

  auth: {
    strategies: {

      // strategy untuk admin
      admin: {
        scheme: 'local',
        token: {
          property: 'token',
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/api/admin/login', method: 'post', propertyName: 'token' },
          logout: { url: '/api/admin/logout', method: 'post'},
          user: { url: '/api/admin/user', method: 'get', propertyName: 'user' }
        },
      },

      // strategy untuk customer
      customer: {
        scheme: 'local',
        token: {
          property: 'token',
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/api/customer/login', method: 'post', propertyName: 'token' },
          logout: { url: '/api/customer/logout', method: 'post'},
          user: { url: '/api/customer/user', method: 'get', propertyName: 'user' }
        },
      },

    },
  },

  render: {
    fallback: {
      static: {
        handlers: {
          '.html': false
        },
        mime: {
          'text/html': ['phtml'] 
        }
      },
      dist: {
        handlers: {
          '.html': false
        }
      }
    }
  },

}
