module.exports = {
  presets: [require("@urbit/foundation-design-system/tailwind.config")],
  content: [
    "./node_modules/@urbit/foundation-design-system/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': 'Inter',
        'mono': 'Source Code Pro'
      }
    }
  }
}
