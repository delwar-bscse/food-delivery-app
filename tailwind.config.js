/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8b0000",
        secondary: "#ffe7e7",
        base: "#4E4E4E",
        bgPrimary: "#FFFFFF",
        bgSecondary: "#E8EFF6",
        clrYes: "#01A633",
        clrNo: "#E80000",
        clrProcess: "#ffC00C",
        clrComplete: "#00006A",
        clrNormal: "#3557FF",
      },
      boxShadow: {
        'custom-card': '1px 1px 10px rgba(0, 0, 0, 0.10)',
      },
    },
  },
  plugins: [],
};
