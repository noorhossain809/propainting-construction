import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate' // Import at the top

const config: Config = {
  // ... other config
  plugins: [tailwindcssAnimate], // Use the imported variable
}

export default config 