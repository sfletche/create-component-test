const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const findInFiles = require('find-in-files');

function writeHandler(err) {
  if(err) {
    return console.log(err);
  }
  console.log("created unit tests!");
}

function getFileContent(path, content) {
  return `// ${path}\n` + content;
}

function getComponentTest(renderedComponent) {
  return `
  describe('${renderedComponent}', () => {
    it('is rendered with props', () => {
      const expectedProps = {
        someProp: props.props,
      };
      expect(component.find('${renderedComponent}').props()).toEqual(expectedProps);
    });
  });
`;
}

function getContent({ pathToComponent, componentName, renderedComponents }) {
  return `
import React from 'react';
import { shallow } from 'enzyme';
// FIXME: following from path needs to be fixed
// determine the depth of the dest path and apply to the from path
import ${componentName} from '../${pathToComponent}';

describe('${componentName}', () => {
  const props = {
    prop: true,
  };

  const component = shallow(<${componentName} {...props} />);

  ${_.map(renderedComponents, getComponentTest).join('')}
});
`;
}

function getFileNameFromPath(pathToComponent) {
  return path.parse(pathToComponent).base;
}

function getKebabCase(pathToComponent) {
  const fileName = getFileNameFromPath(pathToComponent);
  return _.kebabCase(fileName.split('.')[0]);
}

function getPascalCase(pathToComponent) {
  const fileName = getFileNameFromPath(pathToComponent);
  return _.startCase(fileName.split('.')[0]).replace(/\s/g, '');
}

function getRenderedComponents(pathToComponent) {
  const matches = [];
  const myRegexp = RegExp('<([A-Z].*)\/>','g');
  try {
    const data = fs.readFileSync(pathToComponent, 'utf8');
    match = myRegexp.exec(data);
    while (match != null) {
      matches.push(match[1].trim());
      match = myRegexp.exec(data);
    }
    return matches;
  } catch(e) {
    console.log('Error:', e.stack);
  }
}

function createUnitTest({ pathToComponent, dest }) {
  const kebabCase = getKebabCase(pathToComponent);
  // console.log('kebabCase', kebabCase);
  const componentName = getPascalCase(pathToComponent);
  // console.log('componentName', componentName);
  const path = `${dest}/${kebabCase}-test.js`;
  // console.log('path', path);
  const renderedComponents = getRenderedComponents(pathToComponent);
  console.log('renderedComponents', renderedComponents);
  console.log('creating unit test...')
  const content = getContent({ pathToComponent, componentName, renderedComponents });
  fs.writeFile(path, getFileContent(path, content), writeHandler);
}

module.exports = createUnitTest;
