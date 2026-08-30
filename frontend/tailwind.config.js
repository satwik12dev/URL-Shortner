/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#090d16",
        card: "rgba(15, 23, 42, 0.65)",
        cardBorder: "rgba(255, 255, 255, 0.08)",
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          DEFAULT: "#6366f1",
        },
        secondary: {
          DEFAULT: "#ec4899",
          500: "#ec4899",
          600: "#db2777",
        },
        accent: {
          DEFAULT: "#8b5cf6",
          glow: "rgba(139, 92, 246, 0.35)",
        },
        navbarColor: "#ffffff",
        btnColor: "#4f46e5",
        linkColor: "#6366f1",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
        "custom-gradient-2": "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
        "card-gradient": "linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.8) 100%)",
        "hero-glow": "radial-gradient(circle at 50% 30%, rgba(99, 102, 241, 0.15), transparent 70%)",
        "mesh-gradient": "radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.12) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(217, 70, 239, 0.12) 0px, transparent 50%)",
      },
      boxShadow: {
        custom: "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
        glow: "0 0 25px -5px rgba(99, 102, 241, 0.4)",
        "glow-purple": "0 0 25px -5px rgba(168, 85, 247, 0.4)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        right: "10px 0px 10px -5px rgba(0, 0, 0, 0.3)",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Outfit", "Inter", "sans-serif"],
        roboto: ["Inter", "Roboto", "sans-serif"],
        montserrat: ["Outfit", "Montserrat", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [],
};