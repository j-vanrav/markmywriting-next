import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        nbbgblue: {
          DEFAULT: "hsl(var(--nbbgblue))",
          foreground: "hsl(var(--nbforeground))",
        },
        nbyellow: {
          DEFAULT: "hsl(var(--nbyellow))",
          foreground: "hsl(var(--nbforeground))",
          background: "hsl(var(--nbyellowlight))",
        },
        nborange: {
          DEFAULT: "hsl(var(--nborange))",
          foreground: "hsl(var(--nbforeground))",
          background: "hsl(var(--nborangelight))",
        },
        nbpurple: {
          DEFAULT: "hsl(var(--nbpurple))",
          foreground: "hsl(var(--nbforeground))",
          background: "hsl(var(--nbpurplelight))",
        },
        nbgreen: {
          DEFAULT: "hsl(var(--nbgreen))",
          foreground: "hsl(var(--nbforeground))",
          background: "hsl(var(--nbgreenlight))",
        },
        nbblue: {
          DEFAULT: "hsl(var(--nbblue))",
          foreground: "hsl(var(--nbforeground))",
          background: "hsl(var(--nbbluelight))",
        },
        blpaleazure: {
          DEFAULT: "hsl(var(--blpaleazure))",
        },
        bltropicalindigo: {
          DEFAULT: "hsl(var(--bltropicalindigo))",
        },
        bliris: {
          DEFAULT: "hsl(var(--bliris))",
        },
        blindigo: {
          DEFAULT: "hsl(var(--blindigo))",
        },
        blrussianviolet: {
          DEFAULT: "hsl(var(--blrussianviolet))",
        },
        fgd: {
          DEFAULT: "hsl(var(--fgd))",
        },
        bgd: {
          DEFAULT: "hsl(var(--bgd))",
        },
        brd: {
          DEFAULT: "hsl(var(--brd))",
        },
        cpy: {
          DEFAULT: "hsl(var(--cpy))",
        },
        cpylight: {
          DEFAULT: "hsl(var(--cpylight))",
        },
        cpylight2: {
          DEFAULT: "hsl(var(--cpylight2))",
        },
        pry: {
          DEFAULT: "hsl(var(--pry))",
        },
        prylight: {
          DEFAULT: "hsl(var(--prylight))",
        },
        prydark: {
          DEFAULT: "hsl(var(--prydark))",
        },
        sry: {
          DEFAULT: "hsl(var(--sry))",
        },
        srylight: {
          DEFAULT: "hsl(var(--srylight))",
        },
        srydark: {
          DEFAULT: "hsl(var(--srydark))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-strong": {
          "50%": { opacity: "20%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-strong": "pulse-strong 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      translate: {
        boxShadowX: "4px",
        boxShadowXHalf: "2px",
        boxShadowY: "4px",
        boxShadowYHalf: "2px",
        reverseBoxShadowX: "-4px",
        reverseBoxShadowXHalf: "-2px",
        reverseBoxShadowY: "-4px",
        reverseBoxShadowYHalf: "-2px",
      },
      boxShadow: {
        light: "4px 4px 0px 0px #000",
        lightHalf: "2px 2px 0px 0px #000",
        dark: "4px 4px 0px 0px #000",
        darkHalf: "2px 2px 0px 0px #000",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
