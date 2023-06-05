module.exports = {
  // ...other Jest configuration options...
  setupFilesAfterEnv: ['./tests/setupTests.js'],

  moduleNameMapper: {
    // Map non-standard extensions to appropriate file handlers
    '\\.(css|less|scss)$': '/mnt/d/JS_tasks/frontend/src/core/logic/CSStub.js', // Replace with your mock file for styles
    '\\.(jpg|jpeg|png|gif|svg)$': 'identity-obj-proxy', // Replace with your mock file for images
  },

  moduleFileExtensions: ['js', 'jsx', 'json', 'node'], // Add other extensions if needed
};
