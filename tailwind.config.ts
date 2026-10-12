import type { Config } from "tailwindcss";

/**
 * Токены цвета/типографики из DESIGN.md (задача design, SHA 2d33e86a…).
 * Тёмная база + холодные ледяные акценты и один тёплый блик.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#05070d",
          900: "#0a0f1a",
          800: "#121a2a",
          700: "#1b2436",
        },
        frost: {
          50: "#f6faff",
          100: "#eaf2ff",
          200: "#cfddf5",
          300: "#a9bede",
          400: "#7f96bb",
        },
        ice: {
          200: "#c8f1ff",
          300: "#8fe3ff",
          400: "#5ecbff",
          500: "#3aa8e0",
          600: "#22678f",
        },
        blush: {
          200: "#ffe9c9",
          300: "#ffd9a8",
          400: "#f7bd77",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "Iowan Old Style",
          "Palatino Linotype",
          "Georgia",
          "serif",
        ],
      },
      maxWidth: {
        shell: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
