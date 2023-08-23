import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
    theme: {
    extend: {
      colors: {//@ts-ignore
        primary: defaultTheme.colors.green
      }
    },
    fontFamily: { //@ts-ignore
    }
  },
    plugins: [
      require('@tailwindcss/typography'),
      //require('@tailwindcss/forms'),
    ],
  
}
