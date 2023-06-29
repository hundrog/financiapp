import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp => {
  const darkTheme = {
    dark: true,
    colors: {
      background: '#212121',
      surface: '#424242',
      primary: '#CDDC39',
      'primary-darken-1': '#C0CA33',
      secondary: '#7E57C2',
      'secondary-darken-1': '#5E35B1',
      success: '#43A047',
      info: '#00ACC1',
      error: '#E53935',
      warning: '#FB8C00',
    },
  }

  const ligthTheme = {
    dark: false,
    colors: {
      background: '#FAFAFA',
      surface: '#E0E0E0',
      primary: '#7E57C2',
      'primary-darken-1': '#5E35B1',
      secondary: '#CDDC39',
      'secondary-darken-1': '#C0CA33',
      success: '#43A047',
      info: '#00ACC1',
      error: '#E53935',
      warning: '#FB8C00',
    },
  }

  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'darkTheme',
      themes: {
        darkTheme,
        ligthTheme,
      },
    },
    ssr: true,
    components,
    directives,
  })

  nuxtApp.vueApp.use(vuetify)
})
