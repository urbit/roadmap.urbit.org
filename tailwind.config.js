module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#f4f3f1',
      black: '#24221E',
      purple: '#5452A8',
      gray: {
        500: '#918f8d',
        700: '#b3b3b2',
        800: '#d3d3d2'
      }
    },
    extend: {
      fontFamily: {
        'sans': 'Urbit Sans',
        'mono': 'Urbit Sans Mono'
      },
    }
  },
  plugins: [],
}
