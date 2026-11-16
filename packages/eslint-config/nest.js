import base from './base.js';

export default [
  ...base,
  {
    rules: {
      // Nest uses empty classes for modules and decorators for everything else.
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
];
