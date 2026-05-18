/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // ── Backgrounds / Surfaces (light white-to-gray hierarchy) ───────────
        background:                  "#FFFFFF",
        surface:                     "#FFFFFF",
        "surface-dim":               "#F2F6F8",
        "surface-bright":            "#FFFFFF",
        "surface-container-lowest":  "#FFFFFF",
        "surface-container-low":     "#F4F8FA",
        "surface-container":         "#E8F2F6",
        "surface-container-high":    "#DAE9F0",
        "surface-container-highest": "#CCDFEA",
        "surface-variant":           "#ECF3F7",
        "on-surface":                "#0E2230",
        "on-background":             "#0E2230",
        "on-surface-variant":        "#3D6070",
        "inverse-surface":           "#0E2230",
        "inverse-on-surface":        "#D8EAE4",
        outline:                     "#8BAFC2",
        "outline-variant":           "#C4DCE8",
        "surface-tint":              "#4FCCB6",

        // ── Primary — Teal (accent for icons, buttons, borders) ──────────────
        primary:                     "#4FCCB6",
        "on-primary":                "#062A3C",
        "primary-container":         "#CDEEE8",
        "on-primary-container":      "#053D4A",
        "primary-fixed":             "#B3EDE4",
        "primary-fixed-dim":         "#4FCCB6",
        "on-primary-fixed":          "#062A3C",
        "on-primary-fixed-variant":  "#083D4A",
        "inverse-primary":           "#4FCCB6",

        // ── Secondary — Gold ─────────────────────────────────────────────────
        secondary:                   "#ECB12E",
        "on-secondary":              "#3A2800",
        "secondary-container":       "#FFF0C5",
        "on-secondary-container":    "#3A2800",
        "secondary-fixed":           "#F8E0A0",
        "secondary-fixed-dim":       "#ECB12E",
        "on-secondary-fixed":        "#3A2800",
        "on-secondary-fixed-variant":"#7A5500",

        // ── Tertiary — Deep Teal ─────────────────────────────────────────────
        tertiary:                    "#116E88",
        "on-tertiary":               "#FFFFFF",
        "tertiary-container":        "#C5E9F5",
        "on-tertiary-container":     "#023040",
        "tertiary-fixed":            "#A0D8E8",
        "tertiary-fixed-dim":        "#116E88",
        "on-tertiary-fixed":         "#062A3C",
        "on-tertiary-fixed-variant": "#0A3D50",

        // ── Error ────────────────────────────────────────────────────────────
        error:                       "#C0334D",
        "on-error":                  "#FFFFFF",
        "error-container":           "#FFEAEE",
        "on-error-container":        "#7A0020",

        // ── Convenience ──────────────────────────────────────────────────────
        "pale-orange":               "#FFFBF0",
      },
      spacing: {
        unit:            "8px",
        gutter:          "24px",
        margin:          "32px",
        "container-max": "1280px",
      },
      maxWidth: {
        "container-max": "1280px",
      },
      fontFamily: {
        h1:         ["var(--font-cairo)", "Cairo", "sans-serif"],
        h2:         ["var(--font-cairo)", "Cairo", "sans-serif"],
        h3:         ["var(--font-cairo)", "Cairo", "sans-serif"],
        "body-lg":  ["var(--font-tajawal)", "Tajawal", "sans-serif"],
        "body-md":  ["var(--font-tajawal)", "Tajawal", "sans-serif"],
        "label-sm": ["var(--font-tajawal)", "Tajawal", "sans-serif"],
      },
      fontSize: {
        h1:         ["40px", { lineHeight: "1.2", fontWeight: "700" }],
        h2:         ["32px", { lineHeight: "1.3", fontWeight: "700" }],
        h3:         ["24px", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg":  ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md":  ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-sm": ["14px", { lineHeight: "1.4", letterSpacing: "0.02em", fontWeight: "500" }],
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.07)",
      },
    },
  },
  plugins: [],
};
