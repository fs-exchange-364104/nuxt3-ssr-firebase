// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/no-multiple-template-root': 'off',

    // check those rule whether we need or not
    // '@stylistic/quotes': 'off',
    // '@stylistic/semi': 'off',
    // '@stylistic/indent': 'off',
    '@stylistic/eol-last': 'off',
    '@stylistic/comma-dangle': 'off',
    '@stylistic/comma-spacing': 'off',
    '@stylistic/member-delimiter-style': 'off',
    '@stylistic/no-multiple-empty-lines': 'off',
    '@stylistic/type-annotation-spacing': 'off',
    '@stylistic/brace-style': 'off',
    'import/order': 'off',
    '@stylistic/padded-blocks': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-indent': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/object-curly-spacing': 'off',
    'vue/no-multi-spaces': 'off',
    'vue/comma-dangle': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/key-spacing': 'off',
    'vue/block-tag-newline': 'off',
    '@stylistic/arrow-parens': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/mustache-interpolation-spacing': 'off',
    'vue/html-comment-content-spacing': 'off',

    // real off rules
    'vue/singleline-html-element-content-newline': 'off',
    '@stylistic/object-curly-spacing': 'off',
  }
})
