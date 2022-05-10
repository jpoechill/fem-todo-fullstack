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
    },
    buildModules: [
        // '@nuxt/postcss8',
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
})