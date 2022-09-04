/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary : {
          100:  "hsl(235, 24%, 19%)",
          900: "hsl(235, 21%, 11%)"
        },
        
        gray : "hsl(234, 39%, 85%)"
      },
      spacing: {
        '72px': '72px',
      }
    }
    
  },
  plugins: [],
}
