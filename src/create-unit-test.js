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
  return `// ${path}\n` + content;
}

function createUnitTest({ pathToComponent, dest }) {
  const componentName = getPascalCase(pathToComponent);
  // console.log('componentName', componentName);
  const path = getDestinationPath({ pathToComponent, dest });
  // console.log('path', path);

  const componentProps = getComponentProps(pathToComponent);
  console.log('componentProps', componentProps);

  const renderedComponents = getRenderedComponents(pathToComponent);
  console.log('renderedComponents', renderedComponents);

  console.log('creating unit test...')
  const content = getContent({ pathToComponent, componentName, componentProps, renderedComponents });
  fs.writeFile(path, getFileContent(path, content), writeHandler);
}

module.exports = createUnitTest;
