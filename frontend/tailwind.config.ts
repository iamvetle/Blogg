import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
    theme: {
    extend: {
      colors: {//@ts-ignore
        primary: defaultTheme.colors.green
      }
    }
  },
    plugins: [
      require('@tailwindcss/typography'),
      //require('@tailwindcss/forms'),
    ],
  
}
