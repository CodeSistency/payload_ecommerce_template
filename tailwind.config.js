/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{jsx,tsx}'], // tell tailwind where to look

  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        background: "var(--background)",
        "primary-dark": "var(--primary-dark)",
        "secondary-dark": "var(--secondary-dark)",
        "accent-dark": "var(--accent-dark)",
        "background-dark": "var(--background-dark)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
}

