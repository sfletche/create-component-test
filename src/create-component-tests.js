const createDirectory = require('./create-directory');
const createUnitTest = require('./create-unit-test');

function createComponentTests(component, dest) {
  createDirectory(dest);
  createUnitTest({ component, dest })
}

module.exports = createComponentTests;
