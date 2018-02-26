const createDirectory = require('./create-directory');
const createUnitTest = require('./create-unit-test');

function createComponentTests(pathToComponent, pathToUnitTest) {
  createDirectory(pathToUnitTest);
  createUnitTest({ pathToComponent, pathToUnitTest })
}

module.exports = createComponentTests;
