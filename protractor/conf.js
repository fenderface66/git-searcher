exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  capabilities: {
    'browserName': 'chrome'
  },

  specs: ['git-spec.js'],

  jasmineNodeOpts: {
    showColors: true
  }
};
