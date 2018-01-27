const fs = require('fs');
const findInFiles = require('find-in-files');
const { getKebabCase, getPascalCase } = require('./helpers')
const getComponentProps = require('./get-component-props');
const getRenderedComponents = require('./get-rendered-components');

function writeHandler(err) {
  if(err) {
    return console.log(err);
  }
  console.log("created unit tests!");
}

function getFileContent(path, content) {
  return `// ${path}\n` + content;
}

function getPropString(propData) {
  const { name, value } = propData;
  const actualValue = value.includes('"') ? value : `props.${value}`;
  return `\n\t\t\t\t${name}: ${actualValue}`;
}

function getComponentTest(renderedComponent) {
  // input { componentName: Signer, props: [{ name: signer, value: signerName }] }
  const { componentName, props } = renderedComponent
  return `
  describe('${componentName}', () => {
    it('is rendered with props', () => {
      const expectedProps = {${props.map(getPropString)}
        // TODO: deal with spaces between quotes (string values)
      };
      expect(component.find('${componentName}').props()).toEqual(expectedProps);
    });
  });
`;
}

function getPropPairs(propData) {
  return `\n\t\t${propData}`;
}

function getContent({ pathToComponent, componentName, componentProps, renderedComponents }) {
  return `
import React from 'react';
import { shallow } from 'enzyme';
// TODO: import from path needs to be fixed
// determine the depth of the dest path and apply to the from path
import ${componentName} from '../${pathToComponent}';

describe('${componentName}', () => {
  // TODO: need to determine prop values
  const props = {${componentProps.map(getPropPairs)}
  };

  const component = shallow(<${componentName} {...props} />);

  ${renderedComponents.map(getComponentTest).join('')}
});
`;
}

function createUnitTest({ pathToComponent, dest }) {
  const kebabCase = getKebabCase(pathToComponent);
  // console.log('kebabCase', kebabCase);
  const componentName = getPascalCase(pathToComponent);
  // console.log('componentName', componentName);
  const path = `${dest}/${kebabCase}-test.js`;
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
