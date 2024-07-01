module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
        secondary: ['Merriweather', 'serif']
      },
      colors: {
        neutral: {
          50: '#ffffff',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#999999',
          400: '#666666',
          500: '#333333',
          600: '#1a1a1a',
          700: '#0d0d0d',
          800: '#080808',
          900: '#030303',
          950: '#000000'
        },
        primary: {
          50: '#effefa',
          100: '#c8fff2',
          200: '#90ffe5',
          300: '#51f7d7',
          400: '#1de4c3',
          500: '#05c7ab',
          600: '#00a18c',
          700: '#058071',
          800: '#0a655c',
          900: '#0e534c',
          950: '#00312e'
        }
      },
      backgroundImage: () => ({
        'circle-gradient':
          'radial-gradient(circle at top right, var(--tw-gradient-stops))'
      })
    }
  },
  plugins: []
};
