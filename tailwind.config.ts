import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)", ...fontFamily.sans],
      },
      colors: {
        background: "#F6F6F6",
      },
    },
    container: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
      },
    },
  },
  plugins: [],
} satisfies Config;
