
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
      };
      expect(component.find('${componentName}').props()).toEqual(expectedProps);
    });
  });
`;
}

function getPropValue(propType) {
  switch (propType.split('.')[0]) {
    case 'string':
      return `'asdf'`;
    case 'bool':
      return false;
    case 'array':
      return [];
    case 'func':
      return () => {};
    case 'number':
      return 23;
    case 'object':
      return {};
    case 'instanceOf(Date)':
      return `'2017-07-20'`;
    default:
      return 'undefined';
  }
}

function getPropPairs(propData) {
  const { propName, propType } = propData;
  const propValue = getPropValue(propType);
  return `\n\t\t${propName}: ${propValue}`;
}

function getContent({ pathToComponent, componentName, componentProps, renderedComponents }) {
  return `
import React from 'react';
import { shallow } from 'enzyme';
// TODO: import from path needs to be fixed
// determine the depth of the dest path and apply to the from path
import ${componentName} from '../${pathToComponent}';

describe('${componentName}', () => {
  const props = {${componentProps.map(getPropPairs)},
  };

  const component = shallow(<${componentName} {...props} />);
  ${renderedComponents.map(getComponentTest).join('')}
});
`;
}

module.exports = getContent;
