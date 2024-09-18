import withMT from "@material-tailwind/react/utils/withMT"
export default withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      'sm': '640px',  // Change this value to your desired breakpoint
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
  },
  plugins: [],
});