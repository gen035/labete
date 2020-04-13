module.exports = {
  plugins: [
    'stylelint-scss',
    'stylelint-order',
  ],
  rules: {
    // Base rules
    'number-leading-zero': 'never',
    'string-quotes': 'single',
    'selector-list-comma-newline-after': 'always',
    'comment-empty-line-before': [
      'always',
      { except: ['first-nested'] },
    ],
    'block-opening-brace-space-before': null,
    'block-opening-brace-space-after': null,
    'at-rule-empty-line-before': [
      'always',
      { ignore: ['after-comment'], except: ['first-nested'] },
    ],
    // Sass rules
    'order/order': [
      'declarations',
      { type: 'at-rule' },
      { type: 'at-rule', hasBlock: true },
      'rules',
    ],
    "order/properties-alphabetical-order": true,
  },
};
