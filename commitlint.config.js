module.exports = {
  extends: ['@commitlint/config-conventional'], 
  rule: {
    'subject-case': [2, 'always', 'lower-case'],  
    'footer-max-line-length': [2, 'always', 100], 
  },
};