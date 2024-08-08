import type { Config } from "tailwindcss";
import type { PluginCreator } from "tailwindcss/types/config";

const overflowWrapPlugin: PluginCreator = ({ addUtilities }) => {
  addUtilities({
    '.overflow-wrap-anywhere': {
      overflowWrap: 'anywhere',
    },
  });
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/js/**/*.js"
  ],
  theme: {
    extend: {

      colors : {
        "lightBlue" : "#3ABEF7",
        "newOrange" : "#E55604",
        "darkBlue" : "#071952",
        "lime" : "#75F256"
      },
      screens: {
        "movil" : "390px",

        'tablet': '768px',
        // => @media (min-width: 640px) { ... }
  
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'desktop': '1440px',
        // => @media (min-width: 1280px) { ... }
      },
      
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'hero-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 54.4%, rgba(0, 0, 0, 0.42) 100%)',
      },
      transitionProperty: {
        'max-height': 'max-height',
        'opacity': 'opacity',
      },
      overflowWrap: {
        anywhere: 'anywhere',
      },
    },
  },
  variants: {
    extend: {
      maxHeight: ['responsive', 'hover', 'focus'],
      opacity: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [
    overflowWrapPlugin,
  ],
};
export default config;
