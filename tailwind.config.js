/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "completed": "2px 3px 11px 2px rgb(30 41 59)",
        "task": "0px 0px 5px -3px black",
        "active": "2px 3px 11px 2px rgb(84 14 151)",
        "post":"-1px 2px 7px -2px black"
      }
    },
  },
  plugins: [],
  mode: 'jit'
}