module.exports = {
  env: {
    es6: true,
    browser: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/prop-types': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'import/no-named-as-default': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'import/extensions': [
      'error',
      {
        '.ts': 'never'
      }
    ],
    'react/no-array-index-key': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prefer-stateless-function': 'off',
    'prefer-arrow-callback': 'warn',
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/camelcase': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'max-len': [
      'off',
      {
        code: 140,
        ignoreUrls: true
      }
    ]
  }
}
