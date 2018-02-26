const fs = require('fs');
const findInFiles = require('find-in-files');
const { getKebabCase, getPascalCase, getDestinationPath } = require('./helpers')
const getComponentProps = require('./get-component-props');
const getRenderedComponents = require('./get-rendered-components');
const getContent = require('./get-content');

function writeHandler(err) {
  if(err) {
    return console.log(err);
  }
  console.log("created unit tests!");
}

function getFileContent(path, content) {
  return content;
}

function createUnitTest({ pathToComponent, dest }) {
  const componentName = getPascalCase(pathToComponent);
  const path = getDestinationPath({ pathToComponent, dest });

  const componentProps = getComponentProps(pathToComponent);
  const renderedComponents = getRenderedComponents(pathToComponent);

  const content = getContent({ pathToComponent, componentName, componentProps, renderedComponents });
  fs.writeFile(path, content, writeHandler);
}

module.exports = createUnitTest;
