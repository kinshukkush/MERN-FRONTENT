/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: { DEFAULT: "#0A0A0F", 800: "#12121A", 700: "#1A1A26", 600: "#22223A" },
        steel: { light: "#C0C0D0", DEFAULT: "#8A8A9A", dark: "#5A5A6A" },
        copper: { DEFAULT: "#B87333", light: "#D4915A", dark: "#8A5520" },
        gold: { DEFAULT: "#D4AF37", light: "#E8CC60", dark: "#A88A1C" },
        chrome: "#E8E8F0",
      },
      fontFamily: {
        heading: ["Bebas Neue", "Chakra Petch", "sans-serif"],
        body: ["DM Sans", "Outfit", "sans-serif"],
      },
      backgroundImage: {
        "metal-gradient": "linear-gradient(135deg, #8A8A9A 0%, #C0C0D0 50%, #8A8A9A 100%)",
        "dark-gradient": "linear-gradient(180deg, #0A0A0F 0%, #12121A 100%)",
      },
      boxShadow: {
        metal: "inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.3), 0 4px 24px rgba(0,0,0,0.5)",
        "metal-lg": "inset 0 2px 0 rgba(255,255,255,0.15), inset 0 -2px 0 rgba(0,0,0,0.4), 0 8px 40px rgba(0,0,0,0.6)",
        copper: "0 0 0 2px #B87333, 0 0 12px rgba(184,115,51,0.4)",
        gold: "0 0 0 2px #D4AF37, 0 0 12px rgba(212,175,55,0.4)",
      },
      animation: {
        "shimmer": "shimmer 2s infinite linear",
        "slide-in-right": "slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "slide-down": "slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "scale-fade": "scaleFade 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "count-up": "countUp 0.6s ease-out",
        "pulse-copper": "pulseCopperGlow 2s ease-in-out infinite",
        "shake": "shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)",
      },
      keyframes: {
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        slideInRight: { "0%": { transform: "translateX(110%)", opacity: 0 }, "100%": { transform: "translateX(0)", opacity: 1 } },
        slideDown: { "0%": { transform: "translateY(-10px)", opacity: 0 }, "100%": { transform: "translateY(0)", opacity: 1 } },
        scaleFade: { "0%": { transform: "scale(0.95)", opacity: 0 }, "100%": { transform: "scale(1)", opacity: 1 } },
        pulseCopperGlow: { "0%,100%": { boxShadow: "0 0 0 0 rgba(184,115,51,0)" }, "50%": { boxShadow: "0 0 0 4px rgba(184,115,51,0.3)" } },
        shake: { "0%,100%": { transform: "translateX(0)" }, "20%": { transform: "translateX(-6px)" }, "40%": { transform: "translateX(6px)" }, "60%": { transform: "translateX(-4px)" }, "80%": { transform: "translateX(4px)" } },
      },
    },
  },
  plugins: [],
};
