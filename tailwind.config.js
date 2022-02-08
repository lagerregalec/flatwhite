module.exports = {
  purge: ['./src/**/*.hbs', './src/main.js'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Helvetica'],
      'serif': ['Times New Roman', 'serif']
    },
    fontSize: {
      'base': '1rem',
      'lg': '1.625rem',
    },
    extend: {},
  },
  variants: {
    extend: {
      borderWidth: ['even'],
      padding: ['even', 'odd']
    },
  },
  plugins: [],
}
