// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//     "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
//   ],
//   darkMode: ["class", '[data-theme="dark"]'],
//   theme: {
//     extend: {},
//   },
//   plugins: [require("@tailwindcss/typography"), require("daisyui")],
//   daisyui: {
//     themes: ["light", "dark"],
//   },
// }



/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  darkMode: ["class", '[data-theme="light"]'],
  theme: {
    extend: {
      screens: {
        'clg': '1220px'
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],  
  daisyui: {
    themes: ["light"],
  },

}


// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/student/**/*.{js,jsx,ts,tsx}",
//     "./src/teacher/**/*.{js,jsx,ts,tsx}",
//     "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
//     "./node_modules/tailwind-datepicker-react/dist/**/*.js",
//   ],
//   darkMode: ["class", '[data-theme="light"]'],
//   theme: {
//     extend: {},
//   },
//   plugins: [require("@tailwindcss/typography"), require("daisyui")],
//   daisyui: {
//     themes: ["light"],
//   },
// }
