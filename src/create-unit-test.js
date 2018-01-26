const _ = require('lodash');
const fs = require('fs');
const path = require('path');

function writeHandler(err) {
  if(err) {
    return console.log(err);
  }
  console.log("created unit tests!");
}

function getFileContent(path, content) {
  return `// ${path}\n` + content;
}

function getContent({ pathToComponent, componentName }) {
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

  describe('otherComponent', () => {
    it('is rendered with props', () => {
      const expectedProps = {
        someProp: props.props,
      };
      expect(component.find('otherComponent').props()).toEqual(expectedProps);
    });
  });
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

// function getRenderedComponents(pathToComponent) {
//   fs.readFile(pathToComponent, function (err, data) {
//     if (err) throw err;
//     console.log('data', data);
//     // if(data.indexOf('search string') >= 0){
//      // console.log(data)
//     // }
//   });
// }

function createUnitTest({ pathToComponent, dest }) {
  const kebabCase = getKebabCase(pathToComponent);
  // console.log('kebabCase', kebabCase);
  const componentName = getPascalCase(pathToComponent);
  // console.log('componentName', componentName);
  const path = `${dest}/${kebabCase}-test.js`;
  // console.log('path', path);
  // const renderedComponents = getRenderedComponents(pathToComponent);
  console.log('creating unit test...')
  const content = getContent({ pathToComponent, componentName });
  fs.writeFile(path, getFileContent(path, content), writeHandler);
}

module.exports = createUnitTest;
