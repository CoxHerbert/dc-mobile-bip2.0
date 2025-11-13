const js = require('@eslint/js');
const vue = require('eslint-plugin-vue');
const prettier = require('eslint-plugin-prettier');

module.exports = [
    {
        ignores: ['dist', 'node_modules', 'docs/**', 'src/uni_modules/**', 'src/uview-ui/**'],
    },
    {
        files: ['**/*.js', '**/*.vue'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                uni: 'readonly',
                wx: 'readonly',
                qq: 'readonly',
                plus: 'readonly',
                WeixinJSBridge: 'readonly',
            },
        },
        plugins: {
            vue,
            prettier,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...vue.configs['vue3-essential'].rules,
            ...prettier.configs.recommended.rules,
            'vue/multi-word-component-names': 'off',
            'vue/no-mutating-props': 'off',
            'vue/no-v-html': 'off',
            'vue/component-api-style': ['error', ['options']],
            'no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
        },
    },
];
