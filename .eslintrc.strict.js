module.exports = {
  extends: './.eslintrc.js',
  rules: {
    // Stricter set of rules applied during pre-commit hook for only staged files.
    // Eventual goal is for these to make it into the base .eslintrc.js
    // where they will be enforced in the CI pipeline
    '@typescript-eslint/no-explicit-any': 'error',
    'import/no-default-export': 'error',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'deprecated/enzyme',
            message:
              'Enzyme libraries are deprecated in favor of React Testing Library',
          },
          {
            name: 'deprecated/moment',
            message: 'Moment is deprecated in favor of date-fns',
          },
        ],
        patterns: [
          {
            group: ['shared/@deprecated*'],
            message:
              'This shared module is deprecated in favor of other modules',
          },
        ],
      },
    ],
  }
};
