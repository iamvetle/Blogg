module.exports = {
    root: true,
    extends: [
        "@nuxt/eslint-config",
        "plugin:nuxt/base",
    ],
        "vue/attribute-hyphenation": ["error", "always" | "never", {
          "ignore": []
        }]
};