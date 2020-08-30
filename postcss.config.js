const tailwindcss = require("tailwindcss");

const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.svelte", "./public/**/*.html"],
  defaultExtractor: content => {
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []
    return broadMatches.concat(innerMatches)
    //content.match(/[A-Za-z0-9-_:/]+/g) || []
  }
});

module.exports = {
  plugins: [
    tailwindcss("./tailwind.js"),
    require('autoprefixer'),

    ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
  ]
};