/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '425px', // Custom breakpoint for 425px
        'xl':'1440px' // Custom breakpoint for 1440px
      },
      fontFamily: {
        sans: ['Roboto', 'Poppins', 'sans-serif'], // Add Roboto and keep Poppins as fallback
      },
      colors: {
              // You can add more custom colors here
        primaryColor: '#006A4E',
        secondaryColor: '#3793E9',
        tertiaryColor:'#D74367',
        QuaternaryColor:"#212121",
        QuinaryColor:"#e6f1f0",
        OctonaryColor:"#909090",
        NonaryColor:"#ebf5fd",
        DecenaryColor:"#f6fcff",
        lightGreen:"#ebf5fd",
        lightestRed:"#ffe6e6",
        mediumRed:"#ff2323",
        Shadesblack:"#0F1014",
        lightwhite:"#9a9cae",
        strongwhite:"#f5f5f5"
      },
    },
  },
  plugins: [

  ],
};
