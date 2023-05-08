export default defineNuxtConfig({
  typescript: {
    strict: true
  },
  tailwindcss: {
    exposeConfig: true
  },
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/google-fonts',
    'nuxt-icon'
  ],
  googleFonts: {
    families: {
      'Open+Sans': true
    },
    display: 'swap'
  },
  srcDir: 'frontend/',
  serverDir: 'backend/'
})
