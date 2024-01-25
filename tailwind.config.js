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
        secondary: ['Roboto Mono', 'monospace']
      },
      colors: {
        neutral: {
          0: '#ffffff',
          50: '#f2f2f2',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4c4c4c',
          800: '#333333',
          900: '#1a1a1a',
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
      }
    }
  },
  plugins: []
};
