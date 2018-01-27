
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

module.exports = getContent;
