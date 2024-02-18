/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1200px",
      },
    },
    colors:{
      ...colors,
      'default-text': "white",
      primary: '#4198FF',
      primary_hover: '#0941AE',
    },
    extend: {
      height:{
        fill: "100dvh",
        pcon: "calc(100dvh - 250px)"
      },
      fontFamily: {
        sans: ['Satoshi', 'Arial', 'sans-serif']
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "sheet-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "sheet-out": {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        "slide-in-from-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out-to-right": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
        "slide-in-from-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out-to-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        pulse: {
          "0%, 100%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0.5, transform: "scale(1.5)" },
        },
        breathing: {
          "0%, 100%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0, transform: "scale(0.8)" },
        },
        "pop-out": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.8)" },
        },
        "pop-in": {
          "0%": { transform: "scale(0.8)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "sheet-in": "sheet-in 0.2s ease-out",
        "sheet-out": "sheet-out 0.2s ease-out",
        "slide-in-from-right": "slide-in-from-right 0.2s ease-out",
        "slide-out-to-right": "slide-out-to-right 0.2s ease-out",
        "slide-in-from-left": "slide-in-from-left 0.2s ease-out",
        "slide-out-to-left": "slide-out-to-left 0.2s ease-out",
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        breathing: 'breathing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        "pop-out": "pop-out 0.2s ease-out",
        "pop-in": "pop-in 0.2s ease-in",
      },
    },
  },
  plugins: [import("tailwindcss-animate")],
}