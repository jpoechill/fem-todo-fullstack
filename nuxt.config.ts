import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    meta: {
        htmlAttrs: {
            lang: 'en'
        },
        title: 'Todo App',
        lang: 'en',
        link: [
            { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300;400;500&display=swap" }
        ],
        script: [
          {
            // src: "./TW-ELEMENTS-PATH/dist/js/index.min.js",
          },
        ],
    },    
    buildModules: [
        "@nuxt3-graphql/urql",
    ],
    css: ["~/assets/css/tailwind.css"],
    build: {
        postcss: {
        postcssOptions: {
            plugins: {
            tailwindcss: {},
            autoprefixer: {},
            },
        },
        },
    },
    urql: {
        url: "http://localhost:4000/"
    },
})