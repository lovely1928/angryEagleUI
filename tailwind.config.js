/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "completed": "2px 3px 11px 2px rgb(30 41 59)",
        "task": "2px 3px 11px 2px rgb(35 150 132)",
        "active": "2px 3px 11px 2px rgb(84 14 151)",
      }
    },
  },
  plugins: [],
  mode: 'jit'
}