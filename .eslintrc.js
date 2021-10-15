module.exports = {
  extends: 'eslint-config-ali/typescript',
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'max-len': 'off',
    'no-await-in-loop': 'off',
    '@typescript-eslint/member-ordering': 'off',
  },
};
