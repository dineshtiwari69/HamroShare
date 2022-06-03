module.exports = {
  content: [
    "./src/**/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        "ms-font": ['"Dosis"', "sans-serif"]
      }
    },
    colors:{
      "ms-bg": "#333a56",
      "ms-button": "#5e6ea7",
      "ms-hover":"#262b40"
    },
    fontSize: {
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      msweight: ['16px'],
      msx: ['14px'],
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
