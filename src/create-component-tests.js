const createDirectory = require('./create-directory');
const createUnitTest = require('./create-unit-test');
const { getPathWithoutFileName } = require('./helpers');

function createComponentTests(pathToComponent, pathToUnitTest) {
  pathToUnitTest = pathToUnitTest || getPathWithoutFileName(pathToComponent);
  createDirectory(pathToUnitTest);
  createUnitTest({ pathToComponent, pathToUnitTest })
}

module.exports = createComponentTests;
