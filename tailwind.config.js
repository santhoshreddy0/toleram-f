import colors from "tailwindcss/colors";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      backgroundSize: {
        '200%': '200% auto',
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'fade-slide-up': 'fadeSlideUp 0.5s ease-out forwards',
        'pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bowl-to-bat': 'bowlToBat 3.2s linear infinite',
        'loft-to-top': 'loftToTop 3.2s ease-out infinite',
        'delivery-to-screen': 'deliveryToScreen 3.2s cubic-bezier(0.15, 0.76, 0.2, 1) infinite',
        'impact-flash': 'impactFlash 3.2s ease-out infinite',
        'hero-screen-ball': 'heroScreenBall 3.2s cubic-bezier(0.08, 0.78, 0.2, 1) infinite',
        'hero-screen-ring': 'heroScreenRing 3.2s ease-out infinite',
        'bat-swing': 'batSwing 3.2s ease-in-out infinite',
        'wicket-drift': 'wicketDrift 6s ease-in-out infinite',
        'wicket-flicker': 'wicketFlicker 2.2s ease-in-out infinite',
        'sketch-jitter': 'sketchJitter 2.8s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeSlideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        bowlToBat: {
          '0%': {
            opacity: '0',
            left: '9%',
            top: '36%',
            transform: 'scale(0.8) rotate(0deg)',
          },
          '8%': {
            opacity: '1',
          },
          '22%': {
            left: '24%',
            top: '58%',
            transform: 'scale(0.92) rotate(120deg)',
          },
          '36%': {
            left: '36%',
            top: '74%',
            transform: 'scale(0.94) rotate(180deg)',
          },
          '44%': {
            left: '44%',
            top: '66%',
            transform: 'scale(0.96) rotate(220deg)',
          },
          '56%': {
            left: '58%',
            top: '69%',
            transform: 'scale(1) rotate(300deg)',
          },
          '67%': {
            opacity: '1',
            left: '72%',
            top: '63%',
            transform: 'scale(1.02) rotate(360deg)',
          },
          '100%': {
            opacity: '0',
            left: '72%',
            top: '63%',
            transform: 'scale(1.02) rotate(420deg)',
          },
        },
        deliveryToScreen: {
          '0%': {
            opacity: '0',
            left: '9%',
            top: '36%',
            transform: 'translate3d(0,0,0) scale(0.82)',
            filter: 'blur(0px)',
          },
          '7%': {
            opacity: '1',
          },
          '24%': {
            left: '24%',
            top: '58%',
            transform: 'translate3d(0,0,0) scale(0.88)',
            filter: 'blur(0px)',
          },
          '36%': {
            left: '36%',
            top: '74%',
            transform: 'translate3d(0,0,0) scale(0.92)',
            filter: 'blur(0px)',
          },
          '45%': {
            left: '44%',
            top: '66%',
            transform: 'translate3d(0,0,0) scale(0.95)',
            filter: 'blur(0px)',
          },
          '60%': {
            left: '58%',
            top: '69%',
            transform: 'translate3d(0,0,0) scale(1)',
            filter: 'blur(0px)',
          },
          '68%': {
            left: '72%',
            top: '63%',
            transform: 'translate3d(0,0,0) scale(1.05)',
            filter: 'blur(0px)',
          },
          '78%': {
            left: '78%',
            top: '56%',
            transform: 'translate3d(0,0,0) scale(1.8)',
            filter: 'blur(0.45px)',
          },
          '90%': {
            opacity: '0.98',
            left: '63%',
            top: '46%',
            transform: 'translate3d(0,0,0) scale(4.6)',
            filter: 'blur(1.5px)',
          },
          '100%': {
            opacity: '0',
            left: '53%',
            top: '40%',
            transform: 'translate3d(0,0,0) scale(8.1)',
            filter: 'blur(2.2px)',
          },
        },
        loftToTop: {
          '0%': {
            opacity: '0',
            left: '72%',
            top: '63%',
            transform: 'scale(0.9) rotate(0deg)',
          },
          '67%': {
            opacity: '0',
          },
          '72%': {
            opacity: '1',
            left: '73%',
            top: '58%',
            transform: 'scale(1.02) rotate(95deg)',
          },
          '82%': {
            opacity: '1',
            left: '82%',
            top: '45%',
            transform: 'scale(1.06) rotate(190deg)',
          },
          '92%': {
            opacity: '1',
            left: '92%',
            top: '28%',
            transform: 'scale(1.12) rotate(300deg)',
          },
          '100%': {
            opacity: '0',
            left: '104%',
            top: '16%',
            transform: 'scale(1.15) rotate(380deg)',
          },
        },
        impactFlash: {
          '0%, 66%': {
            opacity: '0',
            left: '72%',
            top: '63%',
            transform: 'scale(0.2)',
          },
          '70%': {
            opacity: '0.9',
            left: '72%',
            top: '63%',
            transform: 'scale(1)',
          },
          '78%, 100%': {
            opacity: '0',
            left: '72%',
            top: '63%',
            transform: 'scale(1.8)',
          },
        },
        heroScreenBall: {
          '0%, 71%': {
            opacity: '0',
            left: '63%',
            top: '26%',
            transform: 'translate3d(0,0,0) scale(0.28)',
            filter: 'blur(0px)',
          },
          '75%': {
            opacity: '1',
            left: '76%',
            top: '21%',
            transform: 'translate3d(0,0,0) scale(0.72)',
            filter: 'blur(0px)',
          },
          '83%': {
            opacity: '1',
            left: '94%',
            top: '15%',
            transform: 'translate3d(0,0,0) scale(1.1)',
            filter: 'blur(0.4px)',
          },
          '92%': {
            opacity: '0.98',
            left: '67%',
            top: '26%',
            transform: 'translate3d(0,0,0) scale(4.2)',
            filter: 'blur(1.2px)',
          },
          '100%': {
            opacity: '0',
            left: '52%',
            top: '40%',
            transform: 'translate3d(0,0,0) scale(7.8)',
            filter: 'blur(2.4px)',
          },
        },
        heroScreenRing: {
          '0%, 80%': {
            opacity: '0',
            left: '52%',
            top: '40%',
            transform: 'scale(0.2)',
          },
          '91%': {
            opacity: '0.78',
            left: '52%',
            top: '40%',
            transform: 'scale(1.35)',
          },
          '100%': {
            opacity: '0',
            left: '52%',
            top: '40%',
            transform: 'scale(2.9)',
          },
        },
        batSwing: {
          '0%, 100%': {
            transform: 'rotate(-20deg)',
          },
          '52%': {
            transform: 'rotate(-28deg)',
          },
          '69%': {
            transform: 'rotate(20deg)',
          },
          '79%': {
            transform: 'rotate(6deg)',
          },
        },
        wicketDrift: {
          '0%, 100%': {
            transform: 'translate3d(0, 0, 0) rotate(-2deg)',
          },
          '50%': {
            transform: 'translate3d(0, -6px, 0) rotate(2deg)',
          },
        },
        wicketFlicker: {
          '0%, 100%': {
            opacity: '0.36',
          },
          '22%': {
            opacity: '0.58',
          },
          '46%': {
            opacity: '0.3',
          },
          '68%': {
            opacity: '0.64',
          },
        },
        sketchJitter: {
          '0%, 100%': {
            transform: 'translate3d(0, 0, 0) rotate(-1.2deg)',
            opacity: '0.65',
          },
          '20%': {
            transform: 'translate3d(-0.5px, -1px, 0) rotate(0.6deg)',
            opacity: '0.85',
          },
          '55%': {
            transform: 'translate3d(0.5px, 0.5px, 0) rotate(-0.4deg)',
            opacity: '0.6',
          },
          '78%': {
            transform: 'translate3d(-0.5px, 1px, 0) rotate(0.8deg)',
            opacity: '0.82',
          },
        },
      },
      colors: {
        // light mode
        tremor: {
          brand: {
            faint: colors.blue[50],
            muted: colors.blue[200],
            subtle: colors.blue[400],
            DEFAULT: colors.blue[500],
            emphasis: colors.blue[700],
            inverted: colors.white,
          },
          background: {
            muted: colors.gray[50],
            subtle: colors.gray[100],
            DEFAULT: colors.white,
            emphasis: colors.gray[700],
          },
          border: {
            DEFAULT: colors.gray[200],
          },
          ring: {
            DEFAULT: colors.gray[200],
          },
          content: {
            subtle: colors.gray[400],
            DEFAULT: colors.gray[500],
            emphasis: colors.gray[700],
            strong: colors.gray[900],
            inverted: colors.white,
          },
        },
        // dark mode
        "dark-tremor": {
          brand: {
            faint: "#0B1229",
            muted: colors.blue[950],
            subtle: colors.blue[800],
            DEFAULT: colors.blue[500],
            emphasis: colors.blue[400],
            inverted: colors.blue[950],
          },
          background: {
            muted: "#131A2B",
            subtle: colors.gray[800],
            DEFAULT: colors.gray[900],
            emphasis: colors.gray[300],
          },
          border: {
            DEFAULT: colors.gray[800],
          },
          ring: {
            DEFAULT: colors.gray[800],
          },
          content: {
            subtle: colors.gray[600],
            DEFAULT: colors.gray[500],
            emphasis: colors.gray[200],
            strong: colors.gray[50],
            inverted: colors.gray[950],
          },
        },
      },
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": ["0.75rem", { lineHeight: "1rem" }],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "data-[selected]"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "data-[selected]"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "data-[selected]"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],

  plugins: [require("@tailwindcss/forms")],
};
