const fs = require('fs');

function writeHandler(err) {
  if(err) {
    return console.log(err);
  }
  console.log("created unit tests!");
}

function getFileContent(directory, content) {
  return `// ${directory}/actions-test.js\n` + content;
}

function getContent(component) {
  return `
import React from 'react';
import { shallow } from 'enzyme';
import ${component} from '../../components/${component}';

describe('${component}', () => {
  const props = {
    prop: true,
  };

  const component = shallow(<${component} {...props} />);

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

function createUnitTest({ component, dest }) {
  const path = `${dest}/${component}-test.js`;
  console.log('creating unit test')
  const content = getContent(component);
  fs.writeFile(path, getFileContent(dest, content), writeHandler);
}

module.exports = createUnitTest;
