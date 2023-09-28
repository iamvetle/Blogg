module.exports = {
    root: true,
    extends: [
        "@nuxt/eslint-config",
        "plugin:nuxt/base",
    ],
    rules: {
        'vue/attribute-hyphenation': ['error', 'always']
    }

}