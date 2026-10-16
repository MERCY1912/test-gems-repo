import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "var(--color-ink-950)",
          900: "var(--color-ink-900)",
          800: "var(--color-ink-800)",
          700: "var(--color-ink-700)",
        },
        cloud: {
          50: "var(--color-cloud-50)",
          300: "var(--color-cloud-300)",
          400: "var(--color-cloud-400)",
        },
        ice: {
          200: "var(--color-ice-200)",
          300: "var(--color-ice-300)",
          500: "var(--color-ice-500)",
        },
        violet: {
          300: "var(--color-violet-300)",
        },
        gold: {
          400: "var(--color-gold-400)",
        },
        positive: {
          400: "var(--color-positive-400)",
        },
        negative: {
          400: "var(--color-negative-400)",
        },
        warning: {
          400: "var(--color-warning-400)",
        },
      },
      fontFamily: {
        display: [
          '"Playfair Display"',
          "Georgia",
          '"Times New Roman"',
          "serif",
        ],
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "1120px",
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
      },
    },
  },
  plugins: [],
};

export default config;
