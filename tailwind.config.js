// tailwind.config.js
module.exports = {
  theme: {
    extend: {},
  },
  future: {
    // Disable future use of oklch()
    hoverOnlyWhenSupported: true,
  },
  experimental: {
    optimizeUniversalDefaults: true, // optional
  },
  corePlugins: {
    preflight: false, // also optional
  }
}
