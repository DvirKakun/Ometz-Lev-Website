/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heebo: ["Heebo", "sans-serif"],
      },
      colors: {
        // ============ ORIGINAL COLORS (Turquoise & Orange) - COMMENTED OUT ============
        primary: {
          50: "#f0fdfc",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6", // Main turquoise
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        accent: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316", // Warm orange
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        //  ============ NEW DOG-TRAINING OPTIMIZED PALETTES ============
        // 🐕 OPTION 1: Golden Retriever & Forest (Matches your logo perfectly!)
        // primary: {
        //   50: "#fef7e6",
        //   100: "#feebc2",
        //   200: "#fdd889",
        //   300: "#fcbe3f", // Golden dog color
        //   400: "#f59e0b",
        //   500: "#d97706", // Rich golden brown
        //   600: "#b45309",
        //   700: "#92400e",
        //   800: "#78350f",
        //   900: "#633112",
        // },
        // accent: {
        //   50: "#f0fdf4",
        //   100: "#dcfce7",
        //   200: "#bbf7d0",
        //   300: "#86efac",
        //   400: "#4ade80",
        //   500: "#22c55e", // Trust green (dog park/nature)
        //   600: "#16a34a",
        //   700: "#15803d",
        //   800: "#166534",
        //   900: "#14532d",
        // },
        // // 🐕 OPTION 2: Loyal Blue & Warm Tan (Professional yet friendly)
        // primary: {
        //   50: "#f8fafc",
        //   100: "#f1f5f9",
        //   200: "#e2e8f0",
        //   300: "#cbd5e1",
        //   400: "#94a3b8",
        //   500: "#475569", // Loyal dog blue-gray
        //   600: "#334155",
        //   700: "#1e293b",
        //   800: "#0f172a",
        //   900: "#020617",
        // },
        // accent: {
        //   50: "#fef3c7",
        //   100: "#fde68a",
        //   200: "#fcd34d",
        //   300: "#fbbf24",
        //   400: "#f59e0b",
        //   500: "#d97706", // Warm tan/biscuit color
        //   600: "#b45309",
        //   700: "#92400e",
        //   800: "#78350f",
        //   900: "#633112",
        // },
        // // 🐕 OPTION 3: Chocolate Lab & Grass (Natural & earthy)
        // primary: {
        //   50: "#fdf2f8",
        //   100: "#fce7f3",
        //   200: "#fbcfe8",
        //   300: "#f9a8d4",
        //   400: "#8b5a3c", // Chocolate lab brown
        //   500: "#7c4a37",
        //   600: "#6b3e2e",
        //   700: "#5a3426",
        //   800: "#4a2a1d",
        //   900: "#3a2015",
        // },
        // accent: {
        //   50: "#f0fdf4",
        //   100: "#dcfce7",
        //   200: "#bbf7d0",
        //   300: "#86efac",
        //   400: "#4ade80",
        //   500: "#22c55e", // Fresh grass green
        //   600: "#16a34a",
        //   700: "#15803d",
        //   800: "#166534",
        //   900: "#14532d",
        // },
        // // 🐕 OPTION 4: Royal Weimaraner & Sunset (Elegant & warm)
        // primary: {
        //   50: "#f8fafc",
        //   100: "#f1f5f9",
        //   200: "#e2e8f0",
        //   300: "#cbd5e1",
        //   400: "#94a3b8",
        //   500: "#64748b", // Weimaraner silver-gray
        //   600: "#475569",
        //   700: "#334155",
        //   800: "#1e293b",
        //   900: "#0f172a",
        // },
        // accent: {
        //   50: "#fff7ed",
        //   100: "#ffedd5",
        //   200: "#fed7aa",
        //   300: "#fdba74",
        //   400: "#fb923c",
        //   500: "#f97316", // Sunset orange (keeps your current accent)
        //   600: "#ea580c",
        //   700: "#c2410c",
        //   800: "#9a3412",
        //   900: "#7c2d12",
        // },
        // // 🐕 OPTION 5: Black Lab & Golden Hour (Bold & sophisticated)
        // primary: {
        //   50: "#f9fafb",
        //   100: "#f3f4f6",
        //   200: "#e5e7eb",
        //   300: "#d1d5db",
        //   400: "#6b7280",
        //   500: "#374151", // Black lab charcoal
        //   600: "#1f2937",
        //   700: "#111827",
        //   800: "#0f172a",
        //   900: "#030712",
        // },
        // accent: {
        //   50: "#fffbeb",
        //   100: "#fef3c7",
        //   200: "#fde68a",
        //   300: "#fcd34d",
        //   400: "#fbbf24",
        //   500: "#f59e0b", // Golden hour amber
        //   600: "#d97706",
        //   700: "#b45309",
        //   800: "#92400e",
        //   900: "#78350f",
        // },
        // 🐕 OPTION 6: Happy Puppy Bright (Optimistic & Joyful) - NEW!
        // primary: {
        //   50: "#fef3c7",
        //   100: "#fde68a",
        //   200: "#fcd34d",
        //   300: "#fbbf24",
        //   400: "#f59e0b",
        //   500: "#eab308", // Bright sunny yellow (puppy happiness)
        //   600: "#ca8a04",
        //   700: "#a16207",
        //   800: "#854d0e",
        //   900: "#713f12",
        // },
        // accent: {
        //   50: "#ecfdf5",
        //   100: "#d1fae5",
        //   200: "#a7f3d0",
        //   300: "#6ee7b7",
        //   400: "#34d399",
        //   500: "#10b981", // Vibrant emerald (life & growth)
        //   600: "#059669",
        //   700: "#047857",
        //   800: "#065f46",
        //   900: "#064e3b",
        // },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "soft-lg":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [require("tailwindcss-rtl")],
};
