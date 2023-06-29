// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    '~/assets/style.scss',
  ],
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
})
