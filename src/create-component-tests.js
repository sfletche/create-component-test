const createDirectory = require('./create-directory');
const createUnitTest = require('./create-unit-test');

function createComponentTests(pathToComponent, dest) {
  createDirectory(dest);
  createUnitTest({ pathToComponent, dest })
}

module.exports = createComponentTests;
