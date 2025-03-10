// tailwind.config.js
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./app/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#007bff",        // Blue for light mode
          secondary: "#6c757d",      // Gray for light mode
          primaryDark: "#0056b3",   // Darker blue for dark mode
          secondaryDark: "#343a40", // Darker gray for dark mode
        },
      },
    },
    darkMode: "class", // Enable dark mode via class
    plugins: [],
  };