module.exports = {
  darkMode: 'class',
  mode: "jit",
  content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./*.vue",
    "./plugins/**/*.{js,ts}",
    // "./nuxt.config.{js,ts}",
  ],
  theme: {

    namedGroups: ["foo", "bar"],
    // ...
    groupLevel: 10,
    // will result in as many direct child selectors as defined here
    groupScope: "scope",
    // will result in group-scope being available in addition to the base group
    groupVariants: ["hover", "focus"],
    // will result in group-scope:hover and group-scope:focus variants
    extend: {},
  },
  variants: {
    // Now you can use nested groups for example in backgroundColor and textColor for hover and focus
    backgroundColor: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus'],
    textColor: ["responsive", "hover", "focus", "group-hover", "group-focus"],
    extend: {},
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    require('tailwindcss-scoped-groups'),
    require("tailwindcss-nested-groups"),
    require("tailwindcss-named-groups"),
  ],
}