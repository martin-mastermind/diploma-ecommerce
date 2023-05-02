export default defineNuxtConfig({
  devtools: {
    enabled: true,
    vscode: {}
  },
  typescript: {
    strict: true
  },
  tailwindcss: {
    exposeConfig: true
  },
  modules: [
    '@nuxt/devtools',
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    'nuxt-vitest',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/google-fonts'
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
