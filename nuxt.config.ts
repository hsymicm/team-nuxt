// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    tsConfig: {
      compilerOptions: {
        baseUrl: '.'
      }
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'radix-vue/nuxt',
    'shadcn-nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@formkit/auto-animate'
  ],
  googleFonts: {
    families: {
      "Lexend Deca": "100..900"
    }
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  routeRules: {
    "/**": { ssr: true }
  },
  vite: {
    optimizeDeps: {
      // exclude: ['@node-rs/argon2-wasm32-wasi']
    }
  }
})