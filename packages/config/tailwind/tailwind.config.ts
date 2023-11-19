import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        beige: '#eef4d4',
        'tea-green': '#daefb3',
        'coral-pink': '#ea9e8d',
        'rusty-red': '#d64550',
        gunmetal: '#1c2826'
      }
    }
  },
  plugins: []
};
export default config;
