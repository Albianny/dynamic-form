// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@invictus.codes/nuxt-vuetify'
      ],
      vuetify: {
        vuetifyOptions: {
         ssr: true,
        },
        moduleOptions: {
          treeshaking: true,
          useIconCDN: true,
          styles: true,
          autoImport: true,
        }
      }
})
